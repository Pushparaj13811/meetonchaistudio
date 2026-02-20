"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeUpTransition, viewportOnce } from "@/lib/motion";

/**
 * Philosophy Section
 *
 * "Great Ideas Start with Great Conversations"
 * Centered text on subtle background
 */
export default function Philosophy() {
  return (
    <section
      style={{
        paddingTop: "var(--space-6)",
        paddingBottom: "var(--space-6)",
        position: "relative",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
      className="philosophy-section"
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0 var(--space-3)",
          textAlign: "center",
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
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 800,
            marginBottom: "var(--space-3)",
            color: "var(--color-text)",
          }}
        >
          Great Ideas Start with Great Conversations.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ ...fadeUpTransition, delay: 0.1 }}
          style={{
            fontSize: "1.125rem",
            lineHeight: 1.8,
            color: "var(--color-text-secondary)",
            maxWidth: "720px",
            margin: "0 auto",
          }}
        >
          We don't just write code; we build partnerships. The best digital
          products come from open collaboration, clear communication, and a deep
          understanding of your users. We bring the technical expertise; you
          bring the vision.
        </motion.p>
      </div>
    </section>
  );
}
