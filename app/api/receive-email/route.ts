import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/receive-email
 *
 * Resend calls this whenever an email arrives at your receiving domain.
 *
 * Setup (do once in Resend dashboard):
 *   1. Emails → Receiving → note your <id>.resend.app address
 *   2. Webhooks → Add endpoint → URL: https://yourdomain.com/api/receive-email
 *      Select event type: "email.received"
 *   3. Copy the Signing Secret → RESEND_WEBHOOK_SECRET in .env.local
 *
 * For custom domain (hello@meetonchai.com):
 *   4. Domains → meetonchai.com → add the MX record Resend shows you
 *      (priority 10, value: inbound.resend.com)
 *
 * What this handler does:
 *   - Verifies the webhook signature (rejects tampered payloads)
 *   - On email.received → forwards the full email to your Gmail via Resend
 */

const resend = new Resend(process.env.RESEND_API_KEY);

// Body must be read as raw text for signature verification
export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  // ── Verify webhook signature ─────────────────────────────────────────────
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

  if (!webhookSecret || webhookSecret === "whsec_...") {
    // No secret configured — only safe in local dev without a tunnel
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }
  } else {
    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
    }

    try {
      resend.webhooks.verify({
        payload: rawBody,
        headers: {
          id: svixId,
          timestamp: svixTimestamp,
          signature: svixSignature,
        },
        webhookSecret,
      });
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  // ── Parse event ──────────────────────────────────────────────────────────
  let event: { type: string; data: { email_id: string; to: string[]; from: string; subject: string } };

  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event.type !== "email.received") {
    // Acknowledge other event types without doing anything
    return NextResponse.json({ received: true });
  }

  const { email_id, from, subject } = event.data;
  const forwardTo = process.env.CONTACT_EMAIL ?? "pushparajmehta002@gmail.com";
  const fromAddress = process.env.FROM_EMAIL ?? "onboarding@resend.dev";

  // ── Forward the full email ───────────────────────────────────────────────
  // resend.emails.receiving.forward() retrieves the original email content
  // (body, attachments, headers) and re-sends it intact.
  try {
    const { error } = await (resend.emails as unknown as {
      receiving: {
        forward: (opts: {
          emailId: string;
          to: string;
          from: string;
        }) => Promise<{ error: unknown }>;
      };
    }).receiving.forward({
      emailId: email_id,
      to: forwardTo,
      from: fromAddress,
    });

    if (error) {
      console.error("[receive-email] Forward error:", error);
      return NextResponse.json({ error: "Forward failed" }, { status: 500 });
    }

    console.log(`[receive-email] Forwarded email from ${from} — "${subject}" → ${forwardTo}`);
  } catch (err) {
    console.error("[receive-email] Unexpected error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  return NextResponse.json({ forwarded: true });
}
