"use client";

import { motion } from "framer-motion";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { fadeIn, fadeInTransition } from "@/lib/motion";

/**
 * Turn 1 — Silence Before Speech
 *
 * Full viewport. Almost empty.
 * The opening line of the conversation, not a headline.
 * Its job: set pace, not explain.
 *
 * Layout:
 *   - Site ID: top-left, meta text, opacity 60%
 *   - Headline: vertically centered with generous top offset
 *   - Nothing else moves
 *
 * Animation: pure opacity fade-in over 700ms. No y-offset. No delay games.
 */
export default function TurnOne() {
  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        paddingTop: "var(--space-4)",
        paddingBottom: "var(--space-6)",
        position: "relative",
      }}
    >
      <ContentContainer
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          flex: 1,
        }}
      >
        {/* Site ID — top-left, stays small */}
        <motion.span
          className="text-meta"
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ ...fadeInTransition, delay: 0.1 }}
          style={{ display: "block" }}
        >
          meetonchai.com
        </motion.span>

        {/* Opening line — vertically weighted toward center-low */}
        <motion.h1
          className="text-display-xl"
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={fadeInTransition}
          style={{
            marginTop: "auto",
            marginBottom: "var(--space-6)",
            maxWidth: "14ch",
            color: "var(--color-text)",
          }}
        >
          Let&apos;s slow this down.
        </motion.h1>
      </ContentContainer>
    </section>
  );
}
