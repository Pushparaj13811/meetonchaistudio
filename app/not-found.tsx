"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-3)",
        background: "linear-gradient(135deg, #0a0a0c 0%, #1a1a1e 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(6rem, 15vw, 10rem)",
            fontFamily: "var(--font-heading)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
            marginBottom: "var(--space-3)",
          }}
        >
          404
        </motion.div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "var(--color-text)",
            marginBottom: "var(--space-2)",
          }}
        >
          Page Not Found
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            marginBottom: "var(--space-4)",
          }}
        >
          Looks like this page went for a chai break and didn't come back. Let's
          get you somewhere more interesting.
        </p>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "var(--space-3)",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: "9999px",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 0 20px rgba(230, 126, 34, 0.4)",
              transition: "all var(--motion-base) var(--ease-out)",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(230, 126, 34, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(230, 126, 34, 0.4)";
            }}
          >
            Back to Home
          </Link>

          <Link
            href="/work"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "var(--color-text)",
              padding: "14px 32px",
              borderRadius: "9999px",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all var(--motion-base) var(--ease-out)",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            View Our Work
          </Link>
        </div>

        {/* Decorative Element */}
        <div
          style={{
            marginTop: "var(--space-5)",
            opacity: 0.3,
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            style={{ margin: "0 auto" }}
          >
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeDasharray="8 8"
              opacity="0.5"
            />
            <path
              d="M60 30 L60 90 M30 60 L90 60"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>
      </motion.div>
    </main>
  );
}
