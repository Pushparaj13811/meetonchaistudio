"use server";

import { Resend } from "resend";
import { isSlotBooked, addBooking } from "@/lib/bookings";

// ─── Shared types ──────────────────────────────────────────────────────────────

export interface BookingConfirmation {
  date: string;
  time: string;
  meetingLink: string;
}

export interface FormState {
  ok: boolean;
  error?: string;
  booking?: BookingConfirmation; // only present after a successful bookSlot
}

// ─── Resend client ─────────────────────────────────────────────────────────────

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key || key === "re_...") return null;
  return new Resend(key);
}

function getEnv() {
  return {
    FROM: process.env.FROM_EMAIL ?? "noreply@meetonchai.com",
    TO: process.env.CONTACT_EMAIL ?? "hello@meetonchai.com",
  };
}

// ─── Meeting link ──────────────────────────────────────────────────────────────

/**
 * Generates a unique Jitsi room URL pre-filled with the booker's display name
 * and email so they land directly in the room without a name prompt.
 *
 * Hash params used:
 *   userInfo.displayName  — skips the name input on join
 *   userInfo.email        — shown in participant panel
 *   config.subject        — meeting title shown in the room header
 *   config.startWithAudioMuted — muted on entry (polite for a first call)
 */
function generateMeetingLink(
  date: string,
  time: string,
  name: string,
  email: string
): string {
  const slug = `${date.replace(/-/g, "")}${time.replace(":", "")}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  const room = `MeetOnChai-${slug}`;

  // Booker-specific hash — pre-fills their name when they click from their email
  const hash = new URLSearchParams({
    "userInfo.displayName": name,
    "userInfo.email": email,
    "config.subject": "Meet on Chai",
    "config.startWithAudioMuted": "true",
  }).toString();

  // Base URL carries the room; hash carries user context
  // The studio clicks from their email without hash params (different link below)
  return `https://meet.jit.si/${room}#${hash}`;
}

/**
 * Studio-side link: same room, pre-filled with the studio owner's name.
 * STUDIO_NAME env var — defaults to "Meet on Chai".
 */
function generateStudioMeetingLink(bookerLink: string): string {
  const roomUrl = bookerLink.split("#")[0]; // strip booker hash
  const studioName = process.env.STUDIO_NAME ?? "Meet on Chai";

  const hash = new URLSearchParams({
    "userInfo.displayName": studioName,
    "config.subject": "Meet on Chai",
    "config.startWithAudioMuted": "true",
  }).toString();

  return `${roomUrl}#${hash}`;
}

// ─── Format helpers ────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

// ─── Email templates ───────────────────────────────────────────────────────────

function emailShell(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
</head>
<body style="margin:0;padding:0;background-color:#0a0a0c;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0c;">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;">
          <tr>
            <td style="padding:48px 40px;">
              <!-- Logo -->
              <div style="margin-bottom:40px;">
                <h2 style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:24px;font-weight:800;letter-spacing:-0.02em;color:#f9fafb;">
                  MeetOn<span style="color:#e67e22;">Chai</span>
                </h2>
              </div>
              ${content}
              <!-- Footer -->
              <div style="margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.08);">
                <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;color:#9ca3af;line-height:1.6;">
                  MeetOnChai Studio &nbsp;·&nbsp;
                  <a href="mailto:hello@meetonchai.com" style="color:#e67e22;text-decoration:none;">hello@meetonchai.com</a>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function bookingConfirmationHtml({
  name,
  date,
  time,
  meetingLink,
  bookingId,
}: {
  name: string;
  date: string;
  time: string;
  meetingLink: string;
  bookingId: string;
}): string {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(time);
  const cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/cancel/${bookingId}`;

  return emailShell(`
    <!-- Heading -->
    <h1 style="margin:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:36px;font-weight:800;color:#f9fafb;line-height:1.2;letter-spacing:-0.02em;">
      Your chai is booked
    </h1>
    <p style="margin:0 0 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:17px;color:#9ca3af;line-height:1.6;">
      Hi ${name}, looking forward to talking it through over a virtual chai.
    </p>

    <!-- Booking details card -->
    <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:28px;margin-bottom:32px;">
      <p style="margin:0 0 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">
        Meeting Details
      </p>
      <div style="margin-bottom:16px;">
        <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Date</p>
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;font-weight:600;color:#f9fafb;">${formattedDate}</p>
      </div>
      <div>
        <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Time</p>
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;font-weight:600;color:#f9fafb;">${formattedTime}</p>
      </div>
    </div>

    <!-- Meeting link button -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
      <tr>
        <td style="background:#e67e22;border-radius:50px;box-shadow:0 0 20px rgba(230,126,34,0.4);">
          <a href="${meetingLink}" style="display:inline-block;padding:16px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.01em;">
            Join the Call →
          </a>
        </td>
      </tr>
    </table>

    <!-- Meeting link plain text fallback -->
    <p style="margin:0 0 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;color:#6b7280;line-height:1.6;">
      Or copy the meeting link:<br />
      <a href="${meetingLink}" style="color:#e67e22;text-decoration:none;word-break:break-all;">${meetingLink}</a>
    </p>

    <!-- Note -->
    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;color:#9ca3af;line-height:1.7;">
      Can&rsquo;t make it? <a href="${cancelUrl}" style="color:#e67e22;text-decoration:none;">Cancel this booking</a> and we&rsquo;ll find another time.
    </p>
  `);
}

function noteAckHtml({ name }: { name: string }): string {
  return emailShell(`
    <!-- Heading -->
    <h1 style="margin:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:36px;font-weight:800;color:#f9fafb;line-height:1.2;letter-spacing:-0.02em;">
      Got your note
    </h1>
    <p style="margin:0 0 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:17px;color:#9ca3af;line-height:1.6;">
      Hi ${name}, we read every message and reply within a day.
    </p>

    <!-- Quote card -->
    <div style="background:rgba(230,126,34,0.1);border-left:3px solid #e67e22;border-radius:12px;padding:20px 24px;margin-bottom:32px;">
      <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;color:#f9fafb;line-height:1.7;font-style:italic;">
        &ldquo;Before we build anything, we prefer to understand what&rsquo;s actually going on.&rdquo;
      </p>
    </div>

    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;color:#9ca3af;line-height:1.7;">
      We&rsquo;ll be in touch soon to find a time to talk over chai.
    </p>
  `);
}

function studioBookingHtml({
  name,
  email,
  date,
  time,
  message,
  meetingLink,
}: {
  name: string;
  email: string;
  date: string;
  time: string;
  message?: string;
  meetingLink: string;
}): string {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(time);

  return emailShell(`
    <!-- Heading -->
    <h1 style="margin:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:36px;font-weight:800;color:#f9fafb;line-height:1.2;letter-spacing:-0.02em;">
      New Booking
    </h1>
    <p style="margin:0 0 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:17px;color:#9ca3af;line-height:1.6;">
      ${name} just booked a slot with you.
    </p>

    <!-- Details card -->
    <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:28px;margin-bottom:32px;">
      <div style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.08);">
        <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Name</p>
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;font-weight:600;color:#f9fafb;">${name}</p>
      </div>
      <div style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.08);">
        <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Email</p>
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;font-weight:600;color:#f9fafb;">
          <a href="mailto:${email}" style="color:#e67e22;text-decoration:none;">${email}</a>
        </p>
      </div>
      <div style="margin-bottom:${message ? '20px' : '0'};${message ? 'padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.08);' : ''}">
        <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Date &amp; Time</p>
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;font-weight:600;color:#f9fafb;">${formattedDate} &nbsp;·&nbsp; ${formattedTime}</p>
      </div>
      ${
        message
          ? `<div>
          <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Message</p>
          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;color:#d1d5db;line-height:1.6;">${message}</p>
        </div>`
          : ""
      }
    </div>

    <!-- Meeting link button -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
      <tr>
        <td style="background:#e67e22;border-radius:50px;box-shadow:0 0 20px rgba(230,126,34,0.4);">
          <a href="${meetingLink}" style="display:inline-block;padding:16px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.01em;">
            Join the Call →
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;color:#6b7280;word-break:break-all;">
      <a href="${meetingLink}" style="color:#e67e22;text-decoration:none;">${meetingLink}</a>
    </p>
  `);
}

// ─── Short note ────────────────────────────────────────────────────────────────

export async function sendNote(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim();
  const message = (formData.get("message") as string | null)?.trim();

  if (!name) return { ok: false, error: "Name is required." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "A valid email is required." };
  if (!message || message.length < 10)
    return { ok: false, error: "Tell us a bit more — at least a sentence." };

  const resend = getResend();
  if (resend) {
    const { FROM, TO } = getEnv();

    const studioNote = resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Note from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    const userAck = resend.emails.send({
      from: FROM,
      to: email,
      subject: `Got your note — Meet on Chai`,
      html: noteAckHtml({ name }),
      text: `Hi ${name},\n\nYour note came through. We read every message and reply within a day.\n\n— Meet on Chai\nhello@meetonchai.com`,
    });

    const [n, u] = await Promise.all([studioNote, userAck]);
    if (n.error) {
      console.error("[sendNote] Studio notification error:", n.error);
      return { ok: false, error: "Couldn't send your note. Please try again." };
    }
    if (u.error) {
      console.error("[sendNote] User acknowledgement error:", u.error);
    }
  } else if (process.env.NODE_ENV === "development") {
    console.log("[Note — Resend not configured]", { name, email, message });
  }

  return { ok: true };
}

// ─── Slot booking ──────────────────────────────────────────────────────────────

export async function bookSlot(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim();
  const message = (formData.get("message") as string | null)?.trim();
  const date = (formData.get("date") as string | null)?.trim();
  const time = (formData.get("time") as string | null)?.trim();

  if (!name) return { ok: false, error: "Name is required." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "A valid email is required." };
  if (!date || !time)
    return { ok: false, error: "Please select a date and time." };

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
    return { ok: false, error: "Invalid date." };

  const OFFERED_TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  if (!OFFERED_TIMES.includes(time))
    return { ok: false, error: "Invalid time slot." };

  const taken = await isSlotBooked(date, time);
  if (taken)
    return {
      ok: false,
      error: "That slot was just taken. Please choose another time.",
    };

  // Generate meeting links — booker link pre-fills their name, studio link pre-fills yours
  const bookerMeetingLink = generateMeetingLink(date, time, name, email);
  const studioMeetingLink = generateStudioMeetingLink(bookerMeetingLink);

  // Store the base room URL (without hash) so it's portable
  const meetingLink = bookerMeetingLink;

  const newBooking = await addBooking({ name, email, date, time, message: message || undefined, meetingLink });

  const resend = getResend();
  if (resend) {
    const { FROM, TO } = getEnv();
    const cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/cancel/${newBooking.id}`;

    const studioNotification = resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New booking — ${name} on ${formatDate(date)} at ${formatTime(time)}`,
      html: studioBookingHtml({ name, email, date, time, message: message || undefined, meetingLink: studioMeetingLink }),
      text: `New booking\n\nName: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}\n${message ? `\nContext:\n${message}` : ""}\n\nYour join link (name pre-filled): ${studioMeetingLink}`,
    });

    const userConfirmation = resend.emails.send({
      from: FROM,
      to: email,
      subject: `Your chai is booked — ${formatDate(date)} at ${formatTime(time)}`,
      html: bookingConfirmationHtml({ name, date, time, meetingLink: bookerMeetingLink, bookingId: newBooking.id }),
      text: `Hi ${name},\n\nYour slot is booked: ${date} at ${time}.\n\nJoin the call (your name is pre-filled): ${bookerMeetingLink}\n\nCan't make it? Cancel here: ${cancelUrl}\n\n— Meet on Chai`,
    });

    const [n, u] = await Promise.all([studioNotification, userConfirmation]);
    if (n.error || u.error) {
      console.error("[bookSlot] Resend error:", n.error ?? u.error);
    }
  } else if (process.env.NODE_ENV === "development") {
    console.log("[Booking — Resend not configured]", { name, email, date, time, meetingLink });
  }

  return { ok: true, booking: { date, time, meetingLink } };
}
