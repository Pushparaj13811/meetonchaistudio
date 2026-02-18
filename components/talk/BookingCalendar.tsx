"use client";

import { useState, useEffect, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bookSlot, type FormState, type BookingConfirmation } from "@/app/talk/actions";

// ─── Constants ────────────────────────────────────────────────────────────────

const OFFERED_TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

const DAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

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

/** First Monday on or before the 1st of the given month/year */
function calendarStart(year: number, month: number): Date {
  const first = new Date(year, month, 1);
  const dow = first.getDay(); // 0=Sun … 6=Sat
  const offset = dow === 0 ? 6 : dow - 1; // steps back to Mon
  return new Date(year, month, 1 - offset);
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

/**
 * BookingCalendar
 *
 * Three internal stages:
 *   calendar → timeslots → form
 *
 * Flow:
 *   1. Calendar — pick a date (weekdays, not past, within 4 weeks)
 *   2. Time slots — fetched from /api/slots, booked ones greyed out
 *   3. Booking form — name, email, optional context; hidden date+time inputs
 *
 * On successful submit, parent receives onSuccess() callback.
 */
interface BookingCalendarProps {
  onSuccess: (booking: BookingConfirmation) => void;
  onCancel: () => void;
}

type Stage = "calendar" | "times" | "form";

export function BookingCalendar({ onSuccess, onCancel }: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ── Calendar state ──────────────────────────────────────────────────────────
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // ── Selection state ─────────────────────────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // ── Availability state ──────────────────────────────────────────────────────
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // ── Stage ───────────────────────────────────────────────────────────────────
  const [stage, setStage] = useState<Stage>("calendar");

  // ── Form state ──────────────────────────────────────────────────────────────
  const [formState, formAction, isPending] = useActionState(bookSlot, initialState);

  // Advance to success when form submits OK — pass booking data up
  useEffect(() => {
    if (formState.ok && formState.booking) {
      onSuccess(formState.booking);
    }
  }, [formState.ok, formState.booking, onSuccess]);

  // ── Date availability ────────────────────────────────────────────────────────
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 28); // 4 weeks out

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
    setStage("times");

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

  function handleTimeClick(t: string) {
    if (bookedTimes.includes(t)) return;
    setSelectedTime(t);
    setStage("form");
  }

  // ── Month navigation ─────────────────────────────────────────────────────────
  const isAtCurrentMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  function prevMonth() {
    if (isAtCurrentMonth) return;
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  // ── Render helpers ───────────────────────────────────────────────────────────
  const grid = buildCalendarGrid(viewYear, viewMonth);

  return (
    <div style={{ maxWidth: "480px" }}>
      <AnimatePresence mode="wait">

        {/* ── Stage: calendar ───────────────────────────────────────── */}
        {stage === "calendar" && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Month header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "var(--space-3)",
              }}
            >
              <button
                type="button"
                onClick={prevMonth}
                disabled={isAtCurrentMonth}
                style={{
                  background: "none", border: "none", cursor: isAtCurrentMonth ? "default" : "pointer",
                  padding: "4px 8px", fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-meta)", color: isAtCurrentMonth ? "var(--color-muted)" : "var(--color-text)",
                  opacity: isAtCurrentMonth ? 0.3 : 1,
                  transition: "opacity var(--motion-base) var(--ease-out)",
                }}
                aria-label="Previous month"
              >
                ←
              </button>

              <span
                className="text-meta"
                style={{ fontWeight: 500, color: "var(--color-text)" }}
              >
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>

              <button
                type="button"
                onClick={nextMonth}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "4px 8px", fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-meta)", color: "var(--color-text)",
                  transition: "opacity var(--motion-base) var(--ease-out)",
                }}
                aria-label="Next month"
              >
                →
              </button>
            </div>

            {/* Day-of-week header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "2px",
                marginBottom: "var(--space-1)",
              }}
            >
              {DAY_LABELS.map((d) => (
                <div
                  key={d}
                  className="text-meta"
                  style={{
                    textAlign: "center",
                    color: "var(--color-muted)",
                    paddingBottom: "4px",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "2px",
              }}
            >
              {grid.map((d, i) => {
                const inMonth = d.getMonth() === viewMonth;
                const selectable = isDateSelectable(d);
                const isToday = isSameDay(d, today);
                const isSelected = selectedDate ? isSameDay(d, selectedDate) : false;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleDateClick(d)}
                    disabled={!selectable}
                    style={{
                      background: isSelected
                        ? "var(--color-accent)"
                        : "none",
                      border: isToday && !isSelected
                        ? "1px solid rgba(18,18,18,0.2)"
                        : "1px solid transparent",
                      borderRadius: "4px",
                      cursor: selectable ? "pointer" : "default",
                      padding: "8px 0",
                      fontFamily: "var(--font-primary)",
                      fontSize: "var(--text-meta)",
                      fontWeight: isToday ? 500 : 400,
                      color: isSelected
                        ? "#fff"
                        : !inMonth || !selectable
                        ? "var(--color-muted)"
                        : "var(--color-text)",
                      opacity: !inMonth ? 0.25 : !selectable && inMonth ? 0.35 : 1,
                      transition: "background var(--motion-base) var(--ease-out), color var(--motion-base) var(--ease-out)",
                    }}
                    aria-label={toDateString(d)}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Cancel */}
            <div style={{ marginTop: "var(--space-4)" }}>
              <button
                type="button"
                onClick={onCancel}
                className="text-meta"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: 0, color: "var(--color-muted)",
                  fontFamily: "var(--font-primary)",
                  transition: "color var(--motion-base) var(--ease-out)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-muted)"; }}
              >
                Never mind
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Stage: time slots ─────────────────────────────────────── */}
        {stage === "times" && selectedDate && (
          <motion.div
            key="times"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Date label + back */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "var(--space-3)",
                marginBottom: "var(--space-4)",
              }}
            >
              <button
                type="button"
                onClick={() => { setStage("calendar"); setSelectedDate(null); }}
                className="text-meta"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: 0, color: "var(--color-muted)",
                  fontFamily: "var(--font-primary)",
                  transition: "color var(--motion-base) var(--ease-out)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-muted)"; }}
              >
                ←
              </button>
              <span
                className="text-meta"
                style={{ fontWeight: 500, color: "var(--color-text)" }}
              >
                {selectedDate.toLocaleDateString("en-GB", {
                  weekday: "long", day: "numeric", month: "long",
                })}
              </span>
            </div>

            {loadingSlots ? (
              <p className="text-meta" style={{ color: "var(--color-muted)" }}>
                Checking availability…
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-2)",
                }}
              >
                {OFFERED_TIMES.map((t) => {
                  const booked = bookedTimes.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleTimeClick(t)}
                      disabled={booked}
                      style={{
                        background: "none",
                        border: `1px solid ${booked ? "rgba(18,18,18,0.12)" : "rgba(18,18,18,0.25)"}`,
                        borderRadius: "4px",
                        cursor: booked ? "default" : "pointer",
                        padding: "10px 20px",
                        fontFamily: "var(--font-primary)",
                        fontSize: "var(--text-meta)",
                        color: booked ? "var(--color-muted)" : "var(--color-text)",
                        opacity: booked ? 0.4 : 1,
                        transition: "border-color var(--motion-base) var(--ease-out), color var(--motion-base) var(--ease-out)",
                      }}
                      onMouseEnter={(e) => {
                        if (!booked) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-text)";
                      }}
                      onMouseLeave={(e) => {
                        if (!booked) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(18,18,18,0.25)";
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Cancel */}
            <div style={{ marginTop: "var(--space-4)" }}>
              <button
                type="button"
                onClick={onCancel}
                className="text-meta"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: 0, color: "var(--color-muted)",
                  fontFamily: "var(--font-primary)",
                  transition: "color var(--motion-base) var(--ease-out)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-muted)"; }}
              >
                Never mind
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Stage: booking form ───────────────────────────────────── */}
        {stage === "form" && selectedDate && selectedTime && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Selected slot label + back */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "var(--space-3)",
                marginBottom: "var(--space-4)",
              }}
            >
              <button
                type="button"
                onClick={() => { setStage("times"); setSelectedTime(null); }}
                className="text-meta"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: 0, color: "var(--color-muted)",
                  fontFamily: "var(--font-primary)",
                  transition: "color var(--motion-base) var(--ease-out)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-muted)"; }}
              >
                ←
              </button>
              <span
                className="text-meta"
                style={{ fontWeight: 500, color: "var(--color-text)" }}
              >
                {selectedDate.toLocaleDateString("en-GB", {
                  weekday: "short", day: "numeric", month: "long",
                })}{" "}
                · {selectedTime}
              </span>
            </div>

            <form
              action={formAction}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
              }}
            >
              {/* Hidden fields carry date + time */}
              <input type="hidden" name="date" value={toDateString(selectedDate)} />
              <input type="hidden" name="time" value={selectedTime} />

              {/* Name */}
              <div>
                <label htmlFor="booking-name" className="field-label">Name</label>
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  className="field-input"
                  placeholder="Your name"
                  autoComplete="name"
                  autoFocus
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="booking-email" className="field-label">Email</label>
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

              {/* Context (optional) */}
              <div>
                <label htmlFor="booking-message" className="field-label">
                  What are you thinking about building? <span style={{ opacity: 0.5 }}>(optional)</span>
                </label>
                <textarea
                  id="booking-message"
                  name="message"
                  className="field-input"
                  placeholder="Brief context is fine."
                  rows={3}
                  style={{ resize: "none" }}
                />
              </div>

              {/* Inline error */}
              <AnimatePresence>
                {formState.error && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-meta"
                    style={{ color: "var(--color-text)" }}
                  >
                    {formState.error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                }}
              >
                <button
                  type="submit"
                  disabled={isPending}
                  style={{
                    background: "none", border: "none",
                    cursor: isPending ? "wait" : "pointer",
                    padding: 0,
                    fontSize: "var(--text-body-l)",
                    lineHeight: "var(--leading-body)",
                    fontWeight: 500,
                    color: isPending ? "var(--color-muted)" : "var(--color-accent)",
                    fontFamily: "var(--font-primary)",
                    transition: "color var(--motion-base) var(--ease-out)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {isPending ? "Booking…" : "Confirm →"}
                </button>

                <button
                  type="button"
                  onClick={onCancel}
                  className="text-meta"
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: 0, color: "var(--color-muted)",
                    fontFamily: "var(--font-primary)",
                    transition: "color var(--motion-base) var(--ease-out)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-muted)"; }}
                >
                  Never mind
                </button>
              </div>
            </form>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
