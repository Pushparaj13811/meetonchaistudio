"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeUpTransition, viewportOnce } from "@/lib/motion";

const testimonials = [
  {
    quote:
      "MeetOnChai completely transformed our online presence. They understood our vision immediately, and the app they built is incredibly smooth. Truly a pleasure to work with.",
    author: "Sarah Jenkins",
    role: "Founder, TechNova",
    initial: "S",
  },
  {
    quote:
      "The level of communication and code quality is unmatched. It felt like they were an in-house team rather than an external agency.",
    author: "David Chen",
    role: "CTO, GrowthStream",
    initial: "D",
  },
  {
    quote:
      "They delivered our MVP in record time without compromising on quality. The product scaled beautifully as we grew.",
    author: "Priya Sharma",
    role: "CEO, HealthTech Solutions",
    initial: "P",
  },
  {
    quote:
      "Finally, a development team that understands both tech and business. They helped us prioritize features that actually moved the needle.",
    author: "Michael Torres",
    role: "Product Manager, FinStart",
    initial: "M",
  },
  {
    quote:
      "The chatbot they built handles 80% of our customer inquiries. ROI was positive within 2 months. Highly recommended!",
    author: "Emma Wilson",
    role: "Head of Operations, RetailPro",
    initial: "E",
  },
  {
    quote:
      "Clean code, great documentation, and zero technical debt. Exactly what we needed for our long-term product vision.",
    author: "Alex Kumar",
    role: "Engineering Lead, DataFlow",
    initial: "A",
  },
];

/**
 * Testimonials Section with Infinite Scroll
 */
export default function Testimonials() {
  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      style={{
        paddingTop: "var(--space-6)",
        paddingBottom: "var(--space-6)",
        position: "relative",
        overflow: "hidden",
      }}
      className="testimonials-section"
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
            What Our Partners Say
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
              margin: "var(--space-2) auto 0",
            }}
          >
            Real feedback from real clients who trusted us with their products.
          </motion.p>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="testimonial-scroll-wrapper"
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            padding: "0 var(--space-3)",
            maskImage: "linear-gradient(to right, transparent, black 2%, black 98%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 2%, black 98%, transparent)",
          }}
        >
          <div
            className="testimonial-scroll"
            style={{
              display: "flex",
              gap: "var(--space-3)",
              animation: "scroll-testimonials 60s linear infinite",
              width: "max-content",
            }}
          >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.author}-${index}`}
              className="testimonial-card"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid var(--color-border)",
                borderRadius: "20px",
                padding: "var(--space-4)",
                minWidth: "340px",
                maxWidth: "340px",
                transition: "all var(--motion-base) var(--ease-out)",
                position: "relative",
                cursor: "pointer",
              }}
            >
              {/* Quote Mark */}
              <div
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "28px",
                  fontSize: "3rem",
                  color: "rgba(230, 126, 34, 0.15)",
                  fontFamily: "serif",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                "
              </div>

              {/* Stars */}
              <div
                style={{
                  display: "flex",
                  gap: "3px",
                  color: "var(--color-accent)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  color: "var(--color-text-secondary)",
                  marginBottom: "var(--space-3)",
                  position: "relative",
                  zIndex: 1,
                  minHeight: "100px",
                }}
              >
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.125rem",
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  {testimonial.initial}
                </div>
                <div>
                  <h4
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      color: "var(--color-text)",
                      marginBottom: "2px",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {testimonial.author}
                  </h4>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-muted)",
                    }}
                  >
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-testimonials {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }

        .testimonial-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--color-border-hover);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        [data-theme="light"] .testimonial-card {
          background: rgba(0, 0, 0, 0.02) !important;
          box-shadow: 0 1px 3px var(--color-shadow);
        }

        [data-theme="light"] .testimonial-card:hover {
          background: rgba(0, 0, 0, 0.04) !important;
          box-shadow: 0 8px 24px -8px var(--color-shadow-hover),
                      0 4px 8px -4px var(--color-shadow);
          transform: translateY(-8px) scale(1.02);
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
