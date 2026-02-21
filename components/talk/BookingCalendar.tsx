"use client";

import { useState, useEffect, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bookSlot, type FormState, type BookingConfirmation } from "@/app/talk/actions";
import { analytics } from "@/lib/analytics";

// ─── Constants ────────────────────────────────────────────────────────────────

// Display times in 12-hour format for UI, but store in 24-hour format
const OFFERED_TIMES = [
  { display: "10:00 AM", value: "10:00" },
  { display: "11:30 AM", value: "11:30" },
  { display: "1:00 PM", value: "13:00" },
  { display: "2:30 PM", value: "14:30" },
  { display: "4:00 PM", value: "16:00" },
];

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const initialState: FormState = { ok: false };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isWeekday(d: Date): boolean {
  const dow = d.getDay(); // 0=Sun, 6=Sat
  return dow !== 0 && dow !== 6;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** First day of calendar grid (starts on Sunday) */
function calendarStart(year: number, month: number): Date {
  const first = new Date(year, month, 1);
  const dow = first.getDay(); // 0=Sun
  return new Date(year, month, 1 - dow);
}

/** 42 cells = 6 rows × 7 cols */
function buildCalendarGrid(year: number, month: number): Date[] {
  const start = calendarStart(year, month);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

interface BookingCalendarProps {
  onSuccess: (booking: BookingConfirmation) => void;
  onCancel: () => void;
}

type Stage = "calendar" | "times" | "form";

export function BookingCalendar({ onSuccess, onCancel }: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Track booking form view on mount
  useEffect(() => {
    analytics.viewBookingForm("talk_page");
  }, []);

  // ── Calendar state ──────────────────────────────────────────────────────────
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // ── Selection state ─────────────────────────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // ── Availability state ──────────────────────────────────────────────────────
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // ── Form state ──────────────────────────────────────────────────────────────
  const [formState, formAction, isPending] = useActionState(bookSlot, initialState);

  // Advance to success when form submits OK
  useEffect(() => {
    if (formState.ok && formState.booking) {
      // Track successful booking
      const bookingId = `${formState.booking.date}_${formState.booking.time}`;
      analytics.bookingConfirmed(bookingId);
      onSuccess(formState.booking);
    }
  }, [formState.ok, formState.booking, onSuccess]);

  // ── Date availability ────────────────────────────────────────────────────────
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 28);

  function isDateSelectable(d: Date): boolean {
    return (
      d >= today &&
      d <= maxDate &&
      isWeekday(d) &&
      d.getMonth() === viewMonth
    );
  }

  // ── Fetch slots when date selected ──────────────────────────────────────────
  async function handleDateClick(d: Date) {
    if (!isDateSelectable(d)) return;
    setSelectedDate(d);
    setSelectedTime(null);
    setLoadingSlots(true);

    try {
      const res = await fetch(`/api/slots?date=${toDateString(d)}`);
      const data = (await res.json()) as { booked: string[] };
      setBookedTimes(data.booked ?? []);
    } catch {
      setBookedTimes([]);
    } finally {
      setLoadingSlots(false);
    }
  }

  function handleTimeClick(timeValue: string) {
    // No need to check bookedTimes since we only show available slots
    setSelectedTime(timeValue);

    // Track time slot selection
    if (selectedDate) {
      analytics.selectTimeSlot(toDateString(selectedDate), timeValue);
    }
  }

  // ── Month navigation ─────────────────────────────────────────────────────────
  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  // ── Render helpers ───────────────────────────────────────────────────────────
  const grid = buildCalendarGrid(viewYear, viewMonth);

  return (
    <div
      className="glass-card booking-calendar-card"
      style={{
        padding: "var(--space-4)",
        borderRadius: "24px",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.5rem",
          fontWeight: 800,
          marginBottom: "var(--space-3)",
          color: "var(--color-text)",
        }}
      >
        Book a 15-minute chai
      </h3>

      {/* Calendar Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--space-3)",
        }}
      >
        <button
          type="button"
          onClick={prevMonth}
          className="calendar-nav-button"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "var(--space-1)",
            color: "var(--color-text-secondary)",
            transition: "all var(--motion-base) var(--ease-out)",
            borderRadius: "9999px",
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <span
          style={{
            fontWeight: 600,
            fontSize: "1.125rem",
            color: "var(--color-text)",
          }}
        >
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>

        <button
          type="button"
          onClick={nextMonth}
          className="calendar-nav-button"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "var(--space-1)",
            color: "var(--color-text-secondary)",
            transition: "all var(--motion-base) var(--ease-out)",
            borderRadius: "9999px",
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Days of Week */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "var(--space-1)",
          marginBottom: "var(--space-1)",
          textAlign: "center",
        }}
      >
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--color-muted)",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "var(--space-1)",
          marginBottom: "var(--space-3)",
        }}
      >
        {grid.map((d, i) => {
          const inMonth = d.getMonth() === viewMonth;
          const selectable = isDateSelectable(d);
          const isToday = isSameDay(d, today);
          const isSelected = selectedDate ? isSameDay(d, selectedDate) : false;
          const isPast = d < today;

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleDateClick(d)}
              disabled={!selectable}
              style={{
                background: isSelected ? "var(--color-accent)" : "none",
                border: "none",
                borderRadius: "8px",
                cursor: selectable ? "pointer" : "not-allowed",
                padding: "var(--space-1)",
                fontFamily: "var(--font-primary)",
                fontSize: "0.875rem",
                fontWeight: isSelected ? 700 : 500,
                color: isSelected
                  ? "#fff"
                  : !inMonth || isPast
                  ? "#4b5563"
                  : "var(--color-text)",
                transition: "all var(--motion-base) var(--ease-out)",
                boxShadow: isSelected
                  ? "0 0 10px rgba(230, 126, 34, 0.5)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (selectable && !isSelected) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectable && !isSelected) {
                  e.currentTarget.style.background = "none";
                }
              }}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      {/* Time Slots Container */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              paddingTop: "var(--space-3)",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <h4
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
                marginBottom: "var(--space-2)",
              }}
            >
              Available times for{" "}
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </h4>

            {loadingSlots ? (
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                Checking availability…
              </p>
            ) : (
              <>
                {/* Filter to show only available (non-booked) time slots */}
                {(() => {
                  const now = new Date();
                  const currentHour = now.getHours();
                  const currentMinute = now.getMinutes();
                  const isToday = selectedDate && isSameDay(selectedDate, now);

                  // Filter out booked slots AND past slots if today
                  const availableSlots = OFFERED_TIMES.filter((timeSlot) => {
                    // Skip if already booked
                    if (bookedTimes.includes(timeSlot.value)) return false;

                    // If today, skip if time has passed
                    if (isToday) {
                      const [slotHour, slotMinute] = timeSlot.value.split(':').map(Number);
                      const slotTimeInMinutes = slotHour * 60 + slotMinute;
                      const currentTimeInMinutes = currentHour * 60 + currentMinute;

                      // Skip if slot time has already passed
                      if (slotTimeInMinutes <= currentTimeInMinutes) return false;
                    }

                    return true;
                  });

                  if (availableSlots.length === 0) {
                    return (
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-text-secondary)",
                          padding: "var(--space-2)",
                          textAlign: "center",
                        }}
                      >
                        No available time slots for this date. Please select another date.
                      </p>
                    );
                  }

                  return (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "var(--space-2)",
                      }}
                    >
                      {availableSlots.map((timeSlot) => {
                        const isSelected = selectedTime === timeSlot.value;

                        return (
                          <button
                            key={timeSlot.value}
                            type="button"
                            onClick={() => handleTimeClick(timeSlot.value)}
                            className={isSelected ? "time-slot-selected" : "time-slot-button"}
                            style={{
                              background: isSelected
                                ? "rgba(230, 126, 34, 0.1)"
                                : "none",
                              border: isSelected
                                ? "1px solid var(--color-accent)"
                                : undefined,
                              borderRadius: "8px",
                              cursor: "pointer",
                              padding: "var(--space-1)",
                              fontFamily: "var(--font-primary)",
                              fontSize: "0.875rem",
                              fontWeight: isSelected ? 600 : 400,
                              color: isSelected
                                ? "var(--color-accent)"
                                : "var(--color-text)",
                              transition: "all var(--motion-base) var(--ease-out)",
                            }}
                          >
                            {timeSlot.display}
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
                {/* Form appears when time is selected */}
                <AnimatePresence>
                  {selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ marginTop: "var(--space-4)" }}
                    >
                      <form
                        action={formAction}
                        onSubmit={() => {
                          // Track booking submission
                          if (selectedDate && selectedTime) {
                            analytics.submitBooking({
                              name: "",
                              email: "",
                              date: toDateString(selectedDate),
                              time: selectedTime,
                            });
                          }
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "var(--space-3)",
                        }}
                      >
                        {/* Hidden fields */}
                        <input
                          type="hidden"
                          name="date"
                          value={toDateString(selectedDate)}
                        />
                        <input type="hidden" name="time" value={selectedTime} />

                        {/* Name */}
                        <div>
                          <label
                            htmlFor="booking-name"
                            style={{
                              display: "block",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: "var(--color-text-secondary)",
                              marginBottom: "var(--space-1)",
                            }}
                          >
                            Name
                          </label>
                          <input
                            id="booking-name"
                            name="name"
                            type="text"
                            className="field-input"
                            placeholder="Your name"
                            autoComplete="name"
                            required
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            htmlFor="booking-email"
                            style={{
                              display: "block",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: "var(--color-text-secondary)",
                              marginBottom: "var(--space-1)",
                            }}
                          >
                            Email
                          </label>
                          <input
                            id="booking-email"
                            name="email"
                            type="email"
                            className="field-input"
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label
                            htmlFor="booking-message"
                            style={{
                              display: "block",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: "var(--color-text-secondary)",
                              marginBottom: "var(--space-1)",
                            }}
                          >
                            Project Details (optional)
                          </label>
                          <textarea
                            id="booking-message"
                            name="message"
                            className="field-input"
                            placeholder="Tell us a bit about what you're building..."
                            rows={4}
                            style={{ resize: "none" }}
                          />
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                          {formState.error && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              style={{
                                fontSize: "0.875rem",
                                color: "#ef4444",
                              }}
                            >
                              {formState.error}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isPending}
                          style={{
                            width: "100%",
                            background: "var(--color-accent)",
                            color: "#fff",
                            padding: "var(--space-2)",
                            borderRadius: "12px",
                            fontSize: "1rem",
                            fontWeight: 600,
                            border: "none",
                            cursor: isPending ? "not-allowed" : "pointer",
                            transition: "all var(--motion-base) var(--ease-out)",
                            boxShadow: "0 0 15px rgba(230, 126, 34, 0.3)",
                          }}
                          onMouseEnter={(e) => {
                            if (!isPending) {
                              e.currentTarget.style.background =
                                "var(--color-accent-hover)";
                              e.currentTarget.style.boxShadow =
                                "0 0 25px rgba(230, 126, 34, 0.5)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isPending) {
                              e.currentTarget.style.background =
                                "var(--color-accent)";
                              e.currentTarget.style.boxShadow =
                                "0 0 15px rgba(230, 126, 34, 0.3)";
                            }
                          }}
                        >
                          {isPending ? "Confirming..." : "Confirm Booking"}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
