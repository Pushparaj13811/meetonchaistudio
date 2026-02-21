"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeUpTransition, viewportOnce, staggerContainer, staggerItem } from "@/lib/motion";
import { analytics } from "@/lib/analytics";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "App Development",
    description:
      "Native and cross-platform mobile applications engineered for performance, speed, and seamless user experiences on iOS and Android.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Web Development",
    description:
      "Fast, responsive, and secure web platforms, from dynamic landing pages to complex e-commerce and scalable SaaS architectures.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "AI & Automation",
    description:
      "Intelligent chatbots, conversational AI systems, and custom AI solutions that automate workflows, enhance customer interactions, and drive data-driven decision making.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
    title: "UI/UX Design",
    description:
      "Intuitive and pixel-perfect interfaces designed to engage users, build brand trust, and maximize your conversion rates.",
  },
];

const workTypes = [
  "MVPs that need to survive real users",
  "Internal tools that replace chaos",
  "AI features that are explainable and maintainable",
  "Products that need one owner, not ten vendors",
];

/**
 * Services Section
 *
 * What we do and the kind of work we take on
 */
export default function Services() {
  return (
    <section
      id="services"
      style={{
        paddingTop: "var(--space-6)",
        paddingBottom: "var(--space-6)",
        position: "relative",
      }}
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
              marginBottom: "var(--space-3)",
              color: "var(--color-text)",
            }}
          >
            Our Services
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
            We engineer end-to-end digital solutions tailored to your unique
            business requirements.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--space-4)",
            marginBottom: "var(--space-6)",
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              onClick={() => analytics.serviceInterest(service.title, "click")}
              className="glass-card"
              style={{
                padding: "var(--space-4)",
                borderRadius: "24px",
                position: "relative",
                overflow: index === 2 ? "hidden" : "visible",
                cursor: "pointer",
              }}
            >
              {index === 3 && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "128px",
                    height: "128px",
                    background: "rgba(230, 126, 34, 0.1)",
                    borderBottomLeftRadius: "100%",
                    zIndex: -1,
                  }}
                />
              )}

              <div
                style={{
                  width: "56px",
                  height: "56px",
                  background: "rgba(230, 126, 34, 0.1)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-accent)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {service.icon}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text)",
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  color: "var(--color-text-secondary)",
                }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "var(--color-border)",
            marginBottom: "var(--space-5)",
          }}
        />

        {/* Work Types */}
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={fadeUpTransition}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              marginBottom: "var(--space-4)",
              color: "var(--color-text)",
            }}
          >
            The kind of work we take on
          </motion.h3>

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
            {workTypes.map((item, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  padding: "var(--space-3)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--space-2)",
                  transition: "all var(--motion-base) var(--ease-out)",
                }}
                className="work-type-card"
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    marginTop: "8px",
                    flexShrink: 0,
                    boxShadow: "0 0 8px rgba(230, 126, 34, 0.5)",
                  }}
                />
                <p
                  style={{
                    fontSize: "1.0625rem",
                    lineHeight: 1.6,
                    color: "var(--color-text-secondary)",
                    margin: 0,
                  }}
                >
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <style jsx global>{`
        .work-type-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--color-border-hover);
          transform: translateY(-2px);
        }

        [data-theme="light"] .work-type-card:hover {
          background: rgba(0, 0, 0, 0.04) !important;
          box-shadow: 0 2px 4px var(--color-shadow);
        }
      `}
        </style>
      </div>
    </section >
  );
}
