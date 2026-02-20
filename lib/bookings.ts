/**
 * lib/bookings.ts — in-house JSON-file booking store.
 *
 * Storage strategy:
 *   Development  → ./data/bookings.json  (git-ignored)
 *   Production   → /tmp/bookings.json    (ephemeral, Vercel-safe)
 *
 * For a persistent production store, swap readFile/writeFile
 * for a KV call (Vercel KV, Upstash, etc.) — the interface stays the same.
 */

import { promises as fs } from "fs";
import path from "path";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Booking {
  id: string;          // nanoid-style: date + time + random suffix
  name: string;
  email: string;
  date: string;        // YYYY-MM-DD
  time: string;        // HH:MM  (24-hour)
  message?: string;
  meetingLink: string; // Jitsi room URL
  createdAt: string;   // ISO timestamp
  cancelled?: boolean; // true if booking was cancelled
  cancelledAt?: string; // ISO timestamp of cancellation
}

// ─── Path resolution ──────────────────────────────────────────────────────────

function storePath(): string {
  if (process.env.NODE_ENV === "production") {
    return "/tmp/bookings.json";
  }
  // Local dev: <project-root>/data/bookings.json
  return path.join(process.cwd(), "data", "bookings.json");
}

// ─── Low-level read / write ───────────────────────────────────────────────────

async function readBookings(): Promise<Booking[]> {
  try {
    const raw = await fs.readFile(storePath(), "utf-8");
    return JSON.parse(raw) as Booking[];
  } catch {
    // File doesn't exist yet — start fresh.
    return [];
  }
}

async function writeBookings(bookings: Booking[]): Promise<void> {
  const filePath = storePath();

  // Ensure parent directory exists (./data/ in dev)
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(bookings, null, 2), "utf-8");
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns all time strings already booked on a given date.
 * Excludes cancelled bookings.
 * e.g. ["09:00", "14:00"]
 */
export async function getBookedTimesForDate(date: string): Promise<string[]> {
  const bookings = await readBookings();
  return bookings
    .filter((b) => b.date === date && !b.cancelled)
    .map((b) => b.time);
}

/**
 * Returns true if the given date + time slot is already taken.
 */
export async function isSlotBooked(date: string, time: string): Promise<boolean> {
  const booked = await getBookedTimesForDate(date);
  return booked.includes(time);
}

/**
 * Appends a new booking. Caller must check isSlotBooked first.
 */
export async function addBooking(
  booking: Omit<Booking, "id" | "createdAt">
): Promise<Booking> {
  const bookings = await readBookings();

  const newBooking: Booking = {
    ...booking,
    id: `${booking.date}-${booking.time}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  await writeBookings(bookings);
  return newBooking;
}

/**
 * Retrieves a booking by its ID.
 */
export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = await readBookings();
  return bookings.find((b) => b.id === id) ?? null;
}

/**
 * Cancels a booking by marking it as cancelled.
 * Returns the updated booking, or null if not found.
 */
export async function cancelBooking(id: string): Promise<Booking | null> {
  const bookings = await readBookings();
  const index = bookings.findIndex((b) => b.id === id);

  if (index === -1) return null;
  if (bookings[index].cancelled) return bookings[index]; // Already cancelled

  bookings[index].cancelled = true;
  bookings[index].cancelledAt = new Date().toISOString();

  await writeBookings(bookings);
  return bookings[index];
}
