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

const workTypes = [
  "MVPs that need to survive real users",
  "Internal tools that replace chaos",
  "AI features that are explainable and maintainable",
  "Products that need one owner, not ten vendors",
];

/**
 * Turn 4 — The Work
 *
 * No icons. No cards. No categories.
 * A flat list of the kinds of projects that are worth taking on.
 * Every item carries equal weight — there is no hierarchy here.
 *
 * Reads like a checklist of recognition, not a menu of services.
 */
export default function TurnFour() {
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
          The kind of work we take on
        </motion.h2>

        {/* Work list — staggered, no bullets, no icons */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
            maxWidth: "640px",
          }}
        >
          {workTypes.map((item) => (
            <motion.li
              key={item}
              variants={staggerItem}
              transition={staggerItemTransition}
              className="text-body-l"
              style={{ color: "var(--color-text)" }}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </ContentContainer>
    </section>
  );
}
