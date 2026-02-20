"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface Booking {
  id: string;
  name: string;
  date: string;
  time: string;
  cancelled?: boolean;
}

/**
 * Cancellation Page
 *
 * Allows users to cancel their booking via email link
 */
export default function CancelBookingPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch booking details
  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`);
        if (!res.ok) {
          setError("Booking not found");
          return;
        }
        const data = await res.json();
        setBooking(data);
        if (data.cancelled) {
          setCancelled(true);
        }
      } catch {
        setError("Failed to load booking");
      } finally {
        setLoading(false);
      }
    }

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  // Handle cancellation
  async function handleCancel() {
    setCancelling(true);
    setError(null);

    try {
      const res = await fetch(`/api/cancel/${bookingId}`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to cancel booking");
        return;
      }

      setCancelled(true);
    } catch {
      setError("Failed to cancel booking");
    } finally {
      setCancelling(false);
    }
  }

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

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--space-3)",
        }}
      >
        <p style={{ color: "var(--color-text-secondary)", fontSize: "1rem" }}>Loading...</p>
      </main>
    );
  }

  if (error && !booking) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--space-3)",
        }}
      >
        <div style={{ maxWidth: "480px", textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "2rem",
              fontWeight: 800,
              marginBottom: "var(--space-2)",
              color: "var(--color-text)",
            }}
          >
            {error}
          </h1>
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: "var(--space-3)",
              color: "var(--color-accent)",
              textDecoration: "none",
            }}
          >
            ← Back to home
          </Link>
        </div>
      </main>
    );
  }

  if (cancelled) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--space-3)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card"
          style={{
            maxWidth: "560px",
            padding: "var(--space-5)",
            borderRadius: "24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(34, 197, 94, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto var(--space-3)",
            }}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="#22c55e"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "2rem",
              fontWeight: 800,
              marginBottom: "var(--space-2)",
              color: "var(--color-text)",
            }}
          >
            Booking Cancelled
          </h1>

          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-4)",
              lineHeight: 1.6,
            }}
          >
            Your booking has been cancelled. We&apos;ve freed up the slot, and you can book another time whenever you&apos;re ready.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            <Link
              href="/talk"
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "var(--color-accent)",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "9999px",
                fontSize: "1rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all var(--motion-base) var(--ease-out)",
              }}
            >
              Book Another Time
            </Link>

            <Link
              href="/"
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                color: "var(--color-text-secondary)",
                padding: "14px 28px",
                fontSize: "1rem",
                textDecoration: "none",
              }}
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-3)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card"
        style={{
          maxWidth: "560px",
          padding: "var(--space-5)",
          borderRadius: "24px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "2rem",
            fontWeight: 800,
            marginBottom: "var(--space-2)",
            color: "var(--color-text)",
          }}
        >
          Cancel Booking
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            marginBottom: "var(--space-4)",
            lineHeight: 1.6,
          }}
        >
          Are you sure you want to cancel this booking?
        </p>

        {booking && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "var(--space-4)",
              marginBottom: "var(--space-4)",
            }}
          >
            <div style={{ marginBottom: "var(--space-2)" }}>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "var(--space-1)",
                }}
              >
                Name
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--color-text)",
                  fontWeight: 500,
                }}
              >
                {booking.name}
              </p>
            </div>

            <div style={{ marginBottom: "var(--space-2)" }}>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "var(--space-1)",
                }}
              >
                Date
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--color-text)",
                  fontWeight: 500,
                }}
              >
                {formatDate(booking.date)}
              </p>
            </div>

            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "var(--space-1)",
                }}
              >
                Time
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--color-text)",
                  fontWeight: 500,
                }}
              >
                {formatTime(booking.time)}
              </p>
            </div>
          </div>
        )}

        {error && (
          <p
            style={{
              fontSize: "0.875rem",
              color: "#ef4444",
              marginBottom: "var(--space-3)",
            }}
          >
            {error}
          </p>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          <button
            onClick={handleCancel}
            disabled={cancelling}
            style={{
              width: "100%",
              background: "#ef4444",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: "9999px",
              fontSize: "1rem",
              fontWeight: 600,
              border: "none",
              cursor: cancelling ? "not-allowed" : "pointer",
              opacity: cancelling ? 0.5 : 1,
              transition: "all var(--motion-base) var(--ease-out)",
            }}
          >
            {cancelling ? "Cancelling..." : "Yes, Cancel Booking"}
          </button>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid rgba(156, 163, 175, 0.3)",
              color: "var(--color-text)",
              padding: "14px 28px",
              borderRadius: "9999px",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all var(--motion-base) var(--ease-out)",
            }}
          >
            No, Keep Booking
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
