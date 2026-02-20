"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeUpTransition, viewportOnce, staggerContainer, staggerItem } from "@/lib/motion";

const workPrinciples = [
  {
    title: "We talk until the problem is boring",
    description: "Deep conversations reveal the real challenges, not just surface symptoms.",
  },
  {
    title: "We define scope until it's uncomfortable",
    description: "Clear boundaries prevent scope creep and keep projects on track.",
  },
  {
    title: "We build fast, review slowly",
    description: "Rapid iteration with thoughtful quality checks at every stage.",
  },
  {
    title: "We ship, document, and stay accountable",
    description: "Delivery includes proper handoff, documentation, and ongoing support.",
  },
];

/**
 * How We Work Section
 *
 * Our working principles with glassmorphism cards
 */
export function HowWeWork() {
  return (
    <section
      id="how-we-work"
      style={{
        paddingTop: "var(--space-6)",
        paddingBottom: "var(--space-6)",
        position: "relative",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
      className="how-we-work-section"
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 var(--space-3)",
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-5)" }}>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={fadeUpTransition}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "var(--color-text)",
            }}
          >
            How we work
          </motion.h2>
        </div>

        {/* Work Principles Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-3)",
          }}
        >
          {workPrinciples.map((principle, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="glass-card"
              style={{
                padding: "var(--space-4)",
                borderRadius: "20px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text)",
                  lineHeight: 1.4,
                }}
              >
                {principle.title}
              </h3>

              <p
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.6,
                  color: "var(--color-text-secondary)",
                }}
              >
                {principle.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
