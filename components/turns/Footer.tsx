"use client";

import { motion } from "framer-motion";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { CTALink } from "@/components/ui/CTALink";
import {
  fadeUp,
  fadeUpTransition,
  viewportOnce,
  fadeUpDelayed,
} from "@/lib/motion";

/**
 * Turn 7 — Close
 *
 * No pressure. The phrasing "if this feels like your pace" qualifies
 * the invitation — it is extended to those for whom the preceding
 * six turns were a match, not to everyone.
 *
 * "Book a 15-minute chai" is specific and named in the studio's own language.
 * 15 minutes is a small commitment. It reads as an offer, not a demand.
 *
 * Footer: single line, meta text. Nothing decorative.
 */
export default function TurnSeven() {
  return (
    <>
      <section
        style={{
          paddingTop: "var(--space-5)",
          paddingBottom: "var(--space-5)",
        }}
      >
        <ContentContainer>
          {/* Close statement */}
          <motion.h2
            className="text-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={fadeUpTransition}
            style={{
              color: "var(--color-text)",
              maxWidth: "560px",
              fontWeight: 600,
            }}
          >
            If this feels like your pace, let&apos;s talk.
          </motion.h2>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={fadeUpDelayed(160)}
            style={{ marginTop: "var(--space-4)" }}
          >
            <CTALink href="/talk">
              Book a 15-minute chai
            </CTALink>
          </motion.div>
        </ContentContainer>
      </section>

      {/* Footer — single line, meta text, no decoration */}
      <footer
        style={{
          paddingTop: "var(--space-4)",
          paddingBottom: "var(--space-4)",
          borderTop: "1px solid rgba(18, 18, 18, 0.08)",
        }}
      >
        <ContentContainer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-3)",
            flexWrap: "wrap",
          }}
        >
          <span className="text-meta">Meet on Chai</span>
          <a
            href="mailto:hello@meetonchai.com"
            className="text-meta"
            style={{
              color: "var(--color-muted)",
              transition: "color var(--motion-base) var(--ease-out)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--color-muted)";
            }}
          >
            hello@meetonchai.com
          </a>
        </ContentContainer>
      </footer>
    </>
  );
}
