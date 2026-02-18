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

function generateMeetingLink(date: string, time: string): string {
  const slug = `${date.replace(/-/g, "")}${time.replace(":", "")}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
  return `https://meet.jit.si/MeetOnChai-${slug}`;
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
<body style="margin:0;padding:0;background-color:#ffffff;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;">
    <tr>
      <td align="center" style="padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
          <tr>
            <td style="padding:48px 32px 0;">
              <!-- Wordmark -->
              <p style="margin:0 0 48px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#7a6a4f;">
                Meet on Chai
              </p>
              ${content}
              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:48px;border-top:1px solid #e8e8e8;">
                <tr>
                  <td style="padding-top:24px;">
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:#999999;line-height:1.5;">
                      Meet on Chai &nbsp;·&nbsp;
                      <a href="mailto:hello@meetonchai.com" style="color:#999999;text-decoration:none;">hello@meetonchai.com</a>
                    </p>
                  </td>
                </tr>
              </table>
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
}: {
  name: string;
  date: string;
  time: string;
  meetingLink: string;
}): string {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(time);

  return emailShell(`
    <!-- Heading -->
    <h1 style="margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:32px;font-weight:600;color:#121212;line-height:1.2;letter-spacing:-0.02em;">
      Your chai is booked.
    </h1>
    <p style="margin:0 0 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;color:#666666;line-height:1.6;">
      Hi ${name}, looking forward to talking it through.
    </p>

    <!-- Booking details card -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e8e8e8;border-radius:8px;margin-bottom:32px;">
      <tr>
        <td style="padding:24px 28px;">
          <p style="margin:0 0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#999999;">
            Booking details
          </p>
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-bottom:10px;padding-right:24px;vertical-align:top;">
                <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;color:#999999;text-transform:uppercase;letter-spacing:0.06em;font-weight:500;">Date</p>
                <p style="margin:4px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:500;color:#121212;">${formattedDate}</p>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:0;padding-right:24px;vertical-align:top;">
                <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;color:#999999;text-transform:uppercase;letter-spacing:0.06em;font-weight:500;">Time</p>
                <p style="margin:4px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:500;color:#121212;">${formattedTime}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Meeting link button -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
      <tr>
        <td style="background-color:#121212;border-radius:6px;">
          <a href="${meetingLink}" style="display:inline-block;padding:14px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;color:#ffffff;text-decoration:none;letter-spacing:0.01em;">
            Join the call →
          </a>
        </td>
      </tr>
    </table>

    <!-- Meeting link plain text fallback -->
    <p style="margin:0 0 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:#999999;line-height:1.6;">
      Or copy the link:<br />
      <a href="${meetingLink}" style="color:#7a6a4f;text-decoration:none;word-break:break-all;">${meetingLink}</a>
    </p>

    <!-- Note -->
    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;color:#666666;line-height:1.7;">
      Can&rsquo;t make it? Just reply to this email and we&rsquo;ll find another time.
    </p>
  `);
}

function noteAckHtml({ name }: { name: string }): string {
  return emailShell(`
    <!-- Heading -->
    <h1 style="margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:32px;font-weight:600;color:#121212;line-height:1.2;letter-spacing:-0.02em;">
      Got your note.
    </h1>
    <p style="margin:0 0 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;color:#666666;line-height:1.6;">
      Hi ${name}, we read every message and reply within a day.
    </p>

    <!-- Divider with message -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left:2px solid #7a6a4f;margin-bottom:32px;">
      <tr>
        <td style="padding:4px 0 4px 20px;">
          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;color:#121212;line-height:1.7;font-style:italic;">
            &ldquo;Before we build anything, we prefer to understand what&rsquo;s actually going on.&rdquo;
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;color:#666666;line-height:1.7;">
      We&rsquo;ll be in touch soon to find a time to talk.
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
    <h1 style="margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:28px;font-weight:600;color:#121212;line-height:1.2;letter-spacing:-0.02em;">
      New booking
    </h1>
    <p style="margin:0 0 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;color:#666666;line-height:1.6;">
      ${name} booked a slot.
    </p>

    <!-- Details card -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e8e8e8;border-radius:8px;margin-bottom:32px;">
      <tr>
        <td style="padding:24px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-bottom:16px;border-bottom:1px solid #f0f0f0;">
                <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;color:#999999;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Name</p>
                <p style="margin:4px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:500;color:#121212;">${name}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 0;border-bottom:1px solid #f0f0f0;">
                <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;color:#999999;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Email</p>
                <p style="margin:4px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:500;color:#121212;">
                  <a href="mailto:${email}" style="color:#7a6a4f;text-decoration:none;">${email}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 0;border-bottom:1px solid #f0f0f0;">
                <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;color:#999999;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Date &amp; Time</p>
                <p style="margin:4px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:500;color:#121212;">${formattedDate} &nbsp;·&nbsp; ${formattedTime}</p>
              </td>
            </tr>
            ${
              message
                ? `<tr>
              <td style="padding:16px 0 0;">
                <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;color:#999999;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Context</p>
                <p style="margin:4px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;color:#333333;line-height:1.6;">${message}</p>
              </td>
            </tr>`
                : ""
            }
          </table>
        </td>
      </tr>
    </table>

    <!-- Meeting link button -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
      <tr>
        <td style="background-color:#121212;border-radius:6px;">
          <a href="${meetingLink}" style="display:inline-block;padding:14px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;color:#ffffff;text-decoration:none;">
            Join the call →
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:#999999;">
      <a href="${meetingLink}" style="color:#7a6a4f;text-decoration:none;word-break:break-all;">${meetingLink}</a>
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

  // Generate meeting link before persisting so it's stored with the booking
  const meetingLink = generateMeetingLink(date, time);

  await addBooking({ name, email, date, time, message: message || undefined, meetingLink });

  const resend = getResend();
  if (resend) {
    const { FROM, TO } = getEnv();

    const studioNotification = resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New booking — ${name} on ${formatDate(date)} at ${formatTime(time)}`,
      html: studioBookingHtml({ name, email, date, time, message: message || undefined, meetingLink }),
      text: `New booking\n\nName: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}\n${message ? `\nContext:\n${message}` : ""}\n\nMeeting link: ${meetingLink}`,
    });

    const userConfirmation = resend.emails.send({
      from: FROM,
      to: email,
      subject: `Your chai is booked — ${formatDate(date)} at ${formatTime(time)}`,
      html: bookingConfirmationHtml({ name, date, time, meetingLink }),
      text: `Hi ${name},\n\nYour slot is booked: ${date} at ${time}.\n\nJoin the call: ${meetingLink}\n\nCan't make it? Reply to this email.\n\n— Meet on Chai`,
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
