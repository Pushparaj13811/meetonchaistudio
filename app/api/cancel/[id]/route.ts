import { NextRequest, NextResponse } from "next/server";
import { cancelBooking, getBookingById } from "@/lib/bookings";
import { Resend } from "resend";

/**
 * POST /api/cancel/[id]
 *
 * Cancels a booking and notifies the studio via email
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking) {
    return NextResponse.json(
      { error: "Booking not found" },
      { status: 404 }
    );
  }

  if (booking.cancelled) {
    return NextResponse.json(
      { error: "Booking already cancelled" },
      { status: 400 }
    );
  }

  // Cancel the booking
  const cancelledBooking = await cancelBooking(id);

  if (!cancelledBooking) {
    return NextResponse.json(
      { error: "Failed to cancel booking" },
      { status: 500 }
    );
  }

  // Notify studio via email if Resend is configured
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && resendKey !== "re_...") {
    const resend = new Resend(resendKey);
    const FROM = process.env.FROM_EMAIL ?? "noreply@meetonchai.com";
    const TO = process.env.CONTACT_EMAIL ?? "hello@meetonchai.com";

    try {
      await resend.emails.send({
        from: FROM,
        to: TO,
        subject: `Booking cancelled — ${booking.name} for ${booking.date} at ${booking.time}`,
        text: `A booking was cancelled:\n\nName: ${booking.name}\nEmail: ${booking.email}\nDate: ${booking.date}\nTime: ${booking.time}\n\nThe slot is now available again.`,
      });
    } catch (error) {
      console.error("[cancelBooking] Email notification error:", error);
      // Don't fail the cancellation if email fails
    }
  } else if (process.env.NODE_ENV === "development") {
    console.log("[Cancellation — Resend not configured]", {
      id: booking.id,
      name: booking.name,
      date: booking.date,
      time: booking.time,
    });
  }

  return NextResponse.json({ success: true });
}
