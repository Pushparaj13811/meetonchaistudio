"use client";

import { useState, useActionState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { BookingCalendar } from "@/components/talk/BookingCalendar";
import { sendNote, type FormState, type BookingConfirmation } from "@/app/talk/actions";
import { fadeIn, fadeInTransition } from "@/lib/motion";

const initialState: FormState = { ok: false };

/**
 * ConversationGate — the dedicated contact screen.
 *
 * Four states:
 *   idle      → Heading + body + two CTAs
 *   calendar  → BookingCalendar (primary path): date → time → form
 *   note      → Short 3-field note form (secondary path)
 *   sent      → "Your chai is brewing." (reached from either path)
 *
 * No Cal.com. No Calendly. In-house booking store.
 */
export function ConversationGate() {
  type GateState = "idle" | "calendar" | "note" | "booked" | "noted";
  const [gate, setGate] = useState<GateState>("idle");
  const [bookingData, setBookingData] = useState<BookingConfirmation | null>(null);

  // Note form state (used only in "note" stage)
  const [noteState, noteAction, noteIsPending] = useActionState(
    sendNote,
    initialState
  );

  // Transition to "noted" when the note form succeeds
  useEffect(() => {
    if (noteState.ok) setGate("noted");
  }, [noteState.ok]);

  function formatDisplayDate(dateStr: string): string {
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  }

  function formatDisplayTime(time: string): string {
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${hour}:${String(m).padStart(2, "0")} ${period}`;
  }

  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "var(--space-5)",
        paddingBottom: "var(--space-5)",
      }}
    >
      <ContentContainer>
        {/* Back navigation */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ ...fadeInTransition, delay: 0.05 }}
          style={{ marginBottom: "var(--space-6)" }}
        >
          <Link
            href="/"
            className="text-meta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              color: "var(--color-muted)",
              transition: "color var(--motion-base) var(--ease-out)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--color-muted)";
            }}
          >
            ← meetonchai.com
          </Link>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── Booked (calendar path) ─────────────────────────────── */}
          {gate === "booked" && bookingData && (
            <motion.div
              key="booked"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="text-display-l"
                style={{ color: "var(--color-text)", marginBottom: "var(--space-3)" }}
              >
                Your chai is booked.
              </p>

              {/* Slot summary */}
              <p
                className="text-body-l"
                style={{ color: "var(--color-muted)", marginBottom: "var(--space-4)" }}
              >
                {formatDisplayDate(bookingData.date)}&nbsp;&nbsp;·&nbsp;&nbsp;{formatDisplayTime(bookingData.time)}
              </p>

              {/* Meeting link */}
              <div style={{ marginBottom: "var(--space-3)" }}>
                <p className="text-meta" style={{ color: "var(--color-muted)", marginBottom: "var(--space-1)" }}>
                  Your meeting link
                </p>
                <a
                  href={bookingData.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "var(--text-body-l)",
                    fontWeight: 500,
                    color: "var(--color-accent)",
                    fontFamily: "var(--font-primary)",
                    textDecoration: "none",
                    transition: "color var(--motion-base) var(--ease-out)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "color-mix(in srgb, var(--color-accent) 70%, var(--color-text) 30%)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)";
                  }}
                >
                  Join the call →
                </a>
              </div>

              <p className="text-meta" style={{ color: "var(--color-muted)", maxWidth: "44ch" }}>
                A confirmation with this link has been sent to your email.
              </p>
            </motion.div>
          )}

          {/* ── Noted (note path) ──────────────────────────────────── */}
          {gate === "noted" && (
            <motion.div
              key="noted"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="text-display-l"
                style={{ color: "var(--color-text)", marginBottom: "var(--space-3)" }}
              >
                Your chai is brewing.
              </p>
              <p
                className="text-body-l"
                style={{ color: "var(--color-muted)", maxWidth: "40ch" }}
              >
                We&apos;ll be in touch within a day to find a time.
              </p>
            </motion.div>
          )}

          {/* ── Idle ───────────────────────────────────────────────── */}
          {gate === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1
                className="text-display-l"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ ...fadeInTransition, delay: 0.15 }}
                style={{
                  color: "var(--color-text)",
                  marginBottom: "var(--space-3)",
                }}
              >
                Let&apos;s talk it through.
              </motion.h1>

              <motion.p
                className="text-body-l"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ ...fadeInTransition, delay: 0.25 }}
                style={{
                  maxWidth: "44ch",
                  color: "var(--color-text)",
                  marginBottom: "var(--space-5)",
                }}
              >
                Before we build anything, we prefer to understand what&apos;s
                actually going on.
              </motion.p>

              {/* Primary + secondary CTAs */}
              <motion.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ ...fadeInTransition, delay: 0.35 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-3)",
                }}
              >
                {/* Primary: book a slot */}
                <button
                  type="button"
                  onClick={() => setGate("calendar")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "var(--text-body-l)",
                    lineHeight: "var(--leading-body)",
                    fontWeight: 500,
                    color: "var(--color-accent)",
                    fontFamily: "var(--font-primary)",
                    transition: "color var(--motion-base) var(--ease-out)",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "color-mix(in srgb, var(--color-accent) 70%, var(--color-text) 30%)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--color-accent)";
                  }}
                >
                  Book a 15-minute chai →
                </button>

                {/* Secondary: send a note */}
                <button
                  type="button"
                  onClick={() => setGate("note")}
                  className="text-meta"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    color: "var(--color-muted)",
                    fontFamily: "var(--font-primary)",
                    transition: "color var(--motion-base) var(--ease-out)",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--color-text)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--color-muted)";
                  }}
                >
                  Or send a short note instead
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ── Calendar (booking flow) ────────────────────────────── */}
          {gate === "calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="text-body-l"
                style={{
                  color: "var(--color-text)",
                  marginBottom: "var(--space-4)",
                }}
              >
                Pick a time that works.
              </p>

              <BookingCalendar
                onSuccess={(data) => {
                  setBookingData(data);
                  setGate("booked");
                }}
                onCancel={() => setGate("idle")}
              />
            </motion.div>
          )}

          {/* ── Note form (secondary path) ─────────────────────────── */}
          {gate === "note" && (
            <motion.div
              key="note"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* useEffect transitions gate to "noted" on noteState.ok */}
              <form
                  action={noteAction}
                  style={{
                    maxWidth: "480px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-4)",
                  }}
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="field-label">Name</label>
                    <input
                      id="name"
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
                    <label htmlFor="email" className="field-label">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="field-input"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* Context */}
                  <div>
                    <label htmlFor="message" className="field-label">
                      What are you thinking about building?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="field-input"
                      placeholder="Brief context is fine."
                      rows={4}
                      required
                      style={{ resize: "none" }}
                    />
                  </div>

                  {/* Inline error */}
                  <AnimatePresence>
                    {noteState.error && (
                      <motion.p
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-meta"
                        style={{ color: "var(--color-text)" }}
                      >
                        {noteState.error}
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
                      disabled={noteIsPending}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: noteIsPending ? "wait" : "pointer",
                        padding: 0,
                        fontSize: "var(--text-body-l)",
                        lineHeight: "var(--leading-body)",
                        fontWeight: 500,
                        color: noteIsPending
                          ? "var(--color-muted)"
                          : "var(--color-accent)",
                        fontFamily: "var(--font-primary)",
                        transition: "color var(--motion-base) var(--ease-out)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      {noteIsPending ? "Sending…" : "Send →"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setGate("idle")}
                      className="text-meta"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        color: "var(--color-muted)",
                        fontFamily: "var(--font-primary)",
                        transition: "color var(--motion-base) var(--ease-out)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "var(--color-text)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "var(--color-muted)";
                      }}
                    >
                      Never mind
                    </button>
                  </div>
                </form>
            </motion.div>
          )}

        </AnimatePresence>
      </ContentContainer>
    </section>
  );
}
