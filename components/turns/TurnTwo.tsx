"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { fadeUp, fadeUpTransition, viewportOnce } from "@/lib/motion";
import { usePauseOnScroll } from "@/hooks/usePauseOnScroll";

/**
 * Turn 2 — The Position
 *
 * "Most software problems are thinking problems disguised as code."
 *
 * This is the core belief stated plainly. It follows the pace-setting opener
 * because the reader has already slowed down. Reads as accurate here,
 * would read as clever if it were first.
 *
 * Pause on Scroll fires here — the most important line on the site
 * should be read, not skimmed.
 */
export default function TurnTwo() {
  const ref = useRef<HTMLElement>(null!);
  usePauseOnScroll(ref);

  return (
    <section
      ref={ref}
      style={{
        paddingTop: "var(--space-6)",
        paddingBottom: "var(--space-4)",
      }}
    >
      <ContentContainer>
        <motion.h2
          className="text-display-l"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={fadeUpTransition}
          style={{
            color: "var(--color-text)",
          }}
        >
          Most software problems are thinking problems disguised as code.
        </motion.h2>
      </ContentContainer>
    </section>
  );
}
