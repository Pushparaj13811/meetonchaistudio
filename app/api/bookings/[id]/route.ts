import { NextRequest, NextResponse } from "next/server";
import { getBookingById } from "@/lib/bookings";

/**
 * GET /api/bookings/[id]
 *
 * Fetches a booking by its ID (used for cancellation page)
 */
export async function GET(
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

  // Return only necessary fields (exclude sensitive data)
  return NextResponse.json({
    id: booking.id,
    name: booking.name,
    date: booking.date,
    time: booking.time,
    cancelled: booking.cancelled ?? false,
  });
}
