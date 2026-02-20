"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ContentContainer } from "@/components/layout/ContentContainer";
import {
  fadeUp,
  fadeUpTransition,
  viewportOnce,
  fadeUpDelayed,
} from "@/lib/motion";
import { usePauseOnScroll } from "@/hooks/usePauseOnScroll";

/**
 * Turn 5 — Experience Without Portfolio
 *
 * Most studios use this slot for case studies. This studio does neither.
 * Instead: name the constraint honestly, then make a claim about standards
 * that doesn't require proof.
 *
 * "The responsibility still counts." is the most load-bearing line on the site.
 * It must hit alone. 96px of space above it is structural, not stylistic.
 * If it appears alongside anything else, it is diminished.
 *
 * The second Pause on Scroll trigger is on the final line — the reader
 * should stop, not scroll past it.
 */
export default function TurnFive() {
  const finalLineRef = useRef<HTMLDivElement>(null!);
  usePauseOnScroll(finalLineRef);

  return (
    <section
      style={{
        paddingTop: "var(--space-5)",
        paddingBottom: "var(--space-4)",
      }}
    >
      <ContentContainer>
        {/* First block — honest constraint */}
        <motion.p
          className="text-body-l"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={fadeUpTransition}
          style={{
            maxWidth: "52ch",
            color: "var(--color-text)",
          }}
        >
          Some of our work was built inside other teams
          <br />
          and can&apos;t be shown publicly.
        </motion.p>

        {/* 96px gap — structural, not decorative */}
        <div style={{ height: "var(--space-5)" }} />

        {/* Final line — stands completely alone */}
        <motion.div
          ref={finalLineRef}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={fadeUpDelayed(80)}
        >
          <p
            className="text-heading"
            style={{
              fontWeight: 600,
              color: "var(--color-text)",
              maxWidth: "unset",
            }}
          >
            The responsibility still counts.
          </p>
        </motion.div>
      </ContentContainer>
    </section>
  );
}
