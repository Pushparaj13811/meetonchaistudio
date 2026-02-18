"use client";

import { motion } from "framer-motion";
import { ContentContainer } from "@/components/layout/ContentContainer";
import {
  fadeUp,
  fadeUpTransition,
  viewportOnce,
  staggerContainer,
  staggerItem,
  staggerItemTransition,
} from "@/lib/motion";

const process = [
  "We talk until the problem is boring",
  "We define scope until it's uncomfortable",
  "We build fast, review slowly",
  "We ship, document, and stay accountable",
];

/**
 * Turn 6 — How We Work
 *
 * Short, structured, engineering-first.
 * Four lines that describe behavior, not methodology.
 * The language is direct ("uncomfortable", "boring") because candor
 * is more trustworthy than polish to a careful technical reader.
 *
 * This section reassures without performing.
 */
export default function TurnSix() {
  return (
    <section
      style={{
        paddingTop: "var(--space-5)",
        paddingBottom: "var(--space-4)",
      }}
    >
      <ContentContainer>
        {/* Section heading */}
        <motion.h2
          className="text-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={fadeUpTransition}
          style={{
            color: "var(--color-text)",
            marginBottom: "var(--space-4)",
          }}
        >
          How we work
        </motion.h2>

        {/* Process list — 60ms stagger */}
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
            maxWidth: "580px",
          }}
        >
          {process.map((item) => (
            <motion.li
              key={item}
              variants={staggerItem}
              transition={{ ...staggerItemTransition, staggerChildren: 0.06 }}
              className="text-body-l"
              style={{ color: "var(--color-text)" }}
            >
              {item}
            </motion.li>
          ))}
        </motion.ol>
      </ContentContainer>
    </section>
  );
}
