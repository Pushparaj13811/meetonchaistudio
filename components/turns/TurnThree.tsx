"use client";

import { motion } from "framer-motion";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { CTALink } from "@/components/ui/CTALink";
import { fadeUp, fadeUpTransition, viewportOnce, fadeUpDelayed } from "@/lib/motion";

const qualifiers = [
  "Fewer features",
  "Clear decisions",
  "Long-term ownership",
];

/**
 * Turn 3 — What "Meet on Chai" Means
 *
 * The studio introduces itself — after stating the position, not before.
 * Split layout used here and nowhere else in the page.
 *
 * Left (7/12): studio introduction — body text
 * Right (4/12): meta qualifiers — secondary context, present for those who want it
 * CTA appears only after the studio has been named.
 *
 * Animation: left block first, right block +120ms, CTA +240ms.
 * Left-to-right stagger mirrors how reading flows.
 */
export default function TurnThree() {
  return (
    <section
      style={{
        paddingTop: "var(--space-4)",
        paddingBottom: "var(--space-5)",
      }}
    >
      <ContentContainer>
        {/* Split layout grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--space-5)",
          }}
          className="turn-three-grid"
        >
          {/* Left — studio introduction */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={fadeUpTransition}
            style={{ gridColumn: "1" }}
          >
            <p
              className="text-body-l"
              style={{
                maxWidth: "52ch",
                color: "var(--color-text)",
              }}
            >
              Meet on Chai is a small product studio.
              <br />
              We build web and mobile software by talking things through
              properly — before writing a single line of code.
            </p>
          </motion.div>

          {/* Right — meta qualifiers */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={fadeUpDelayed(120)}
            style={{ gridColumn: "1" }}
            className="turn-three-meta"
          >
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-1)",
              }}
            >
              {qualifiers.map((item) => (
                <li
                  key={item}
                  className="text-meta"
                  style={{ color: "var(--color-muted)" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA — appears after studio is introduced */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={fadeUpDelayed(240)}
          style={{ marginTop: "var(--space-4)" }}
        >
          <CTALink href="/talk">
            Start a conversation
          </CTALink>
        </motion.div>
      </ContentContainer>

      {/* Responsive: on wider screens, side-by-side layout */}
      <style>{`
        @media (min-width: 768px) {
          .turn-three-grid {
            grid-template-columns: 7fr 4fr !important;
            align-items: start;
          }
          .turn-three-meta {
            grid-column: 2 !important;
            grid-row: 1;
            padding-top: 3px; /* optical baseline alignment with body text */
          }
        }
      `}</style>
    </section>
  );
}
