"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, fadeUpTransition, viewportOnce } from "@/lib/motion";

/**
 * CTA Section
 *
 * Final call to action before footer
 */
export default function CTA() {
  return (
    <section
      id="contact"
      style={{
        paddingTop: "var(--space-6)",
        paddingBottom: "var(--space-6)",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--color-border)",
      }}
      className="cta-section"
    >
      {/* Background Elements */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 0%, rgba(230, 126, 34, 0.05) 100%)",
        }}
        className="cta-gradient"
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background: "rgba(230, 126, 34, 0.2)",
          borderRadius: "100% 100% 0 0",
          filter: "blur(120px)",
          zIndex: -1,
        }}
        className="cta-glow"
      />

      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0 var(--space-3)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={fadeUpTransition}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
            fontWeight: 900,
            marginBottom: "var(--space-4)",
            lineHeight: 1.1,
          }}
        >
          If this feels like your pace,{" "}
          <span className="text-gradient">let's talk.</span>
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ ...fadeUpTransition, delay: 0.15 }}
          style={{ marginTop: "var(--space-5)" }}
        >
          <Link
            href="/talk"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "var(--color-accent)",
              transition: "color var(--motion-base) var(--ease-out)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-accent-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-accent)";
            }}
          >
            Book a 15-minute chai →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
