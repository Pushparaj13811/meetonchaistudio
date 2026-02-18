import { NextRequest, NextResponse } from "next/server";
import { getBookedTimesForDate } from "@/lib/bookings";

/**
 * GET /api/slots?date=YYYY-MM-DD
 *
 * Returns the list of time strings already booked on that date.
 * The client uses this to grey out unavailable slots in real time.
 *
 * Response:
 *   { booked: string[] }   e.g. { booked: ["09:00", "14:00"] }
 */
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "date param required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  const booked = await getBookedTimesForDate(date);

  return NextResponse.json({ booked }, { status: 200 });
}
