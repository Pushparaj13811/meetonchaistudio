"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, fadeUpTransition, viewportOnce, staggerContainer, staggerItem } from "@/lib/motion";

const faqs = [
  {
    question: "What's your typical project timeline?",
    answer:
      "MVPs typically take 4-8 weeks. Full products range from 2-4 months. We break projects into sprints and deliver working features every 2 weeks, so you see progress continuously.",
  },
  {
    question: "Do you work with startups or only established companies?",
    answer:
      "We love working with both! Startups get our MVP expertise and speed. Established companies get scalable solutions and integration with existing systems. We adapt our approach based on your stage.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We primarily use Next.js, React Native, TypeScript, Node.js, and leading AI frameworks. But we choose tech based on your needs, not our preferences. If your existing stack works, we'll work within it.",
  },
  {
    question: "How do you handle project pricing?",
    answer:
      "We offer both fixed-price projects (best for well-defined MVPs) and time & materials (better for evolving products). After our discovery call, we'll recommend the model that fits your situation and provide a detailed quote.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes! We offer 30 days of included bug fixes post-launch. After that, you can choose monthly maintenance packages or on-demand support. We also offer growth partnerships where we continue building as your product evolves.",
  },
  {
    question: "Can you integrate AI into existing products?",
    answer:
      "Absolutely. We specialize in adding chatbots, conversational AI, and custom AI features to existing apps and websites. Most AI integrations take 2-4 weeks and don't require rebuilding your entire product.",
  },
  {
    question: "What if we need changes mid-project?",
    answer:
      "Changes are normal! We use agile development, so you can adjust priorities between sprints. Major scope changes might affect timeline and cost, which we'll discuss transparently before proceeding.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes, absolutely. We're happy to sign your NDA before any detailed discussions. Your intellectual property and ideas are protected throughout our engagement.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{
        paddingTop: "var(--space-6)",
        paddingBottom: "var(--space-6)",
        borderTop: "1px solid var(--color-border)",
      }}
      className="faq-section"
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 var(--space-3)",
        }}
      >
        {/* Header */}
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
              marginBottom: "var(--space-3)",
              color: "var(--color-text)",
            }}
          >
            Questions? Answered.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ ...fadeUpTransition, delay: 0.1 }}
            style={{
              fontSize: "1.125rem",
              color: "var(--color-text-secondary)",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Everything you need to know before we grab that chai together.
          </motion.p>
        </div>

        {/* FAQ Items */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid var(--color-border)",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "all var(--motion-base) var(--ease-out)",
              }}
              className="faq-item"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: "100%",
                  padding: "var(--space-3)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "var(--space-2)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "var(--color-text)",
                  }}
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    flexShrink: 0,
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "0 var(--space-3) var(--space-3)",
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        color: "var(--color-text-secondary)",
                        borderTop: "1px solid var(--color-border)",
                        paddingTop: "var(--space-3)",
                      }}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ ...fadeUpTransition, delay: 0.2 }}
          style={{
            textAlign: "center",
            marginTop: "var(--space-5)",
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-2)",
            }}
          >
            Still have questions?
          </p>
          <a
            href="/talk"
            style={{
              color: "var(--color-accent)",
              fontSize: "1.125rem",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all var(--motion-base) var(--ease-out)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.gap = "12px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.gap = "8px";
            }}
          >
            Let's talk about it
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      <style jsx global>{`
        .faq-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--color-border-hover);
        }

        [data-theme="light"] .faq-item {
          background: rgba(0, 0, 0, 0.02) !important;
          box-shadow: 0 1px 2px var(--color-shadow);
        }

        [data-theme="light"] .faq-item:hover {
          background: rgba(0, 0, 0, 0.04) !important;
          box-shadow: 0 2px 4px var(--color-shadow);
        }
      `}</style>
    </section>
  );
}
