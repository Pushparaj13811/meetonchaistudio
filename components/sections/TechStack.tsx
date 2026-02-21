"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  fadeUpTransition,
  viewportOnce,
} from "@/lib/motion";
import Image from "next/image";
const technologies = [
  { name: "Next.js", icon: "nextjs", color: "#000000" },
  { name: "React", icon: "react", color: "#61DAFB" },
  { name: "TypeScript", icon: "typescript", color: "#3178C6" },
  { name: "React Native", icon: "react", color: "#61DAFB" },
  { name: "Node.js", icon: "nodejs", color: "#339933" },
  { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
  { name: "MongoDB", icon: "mongodb", color: "#47A248" },
  { name: "Tailwind", icon: "tailwindcss", color: "#06B6D4" },
  { name: "OpenAI", icon: "openai", color: "#412991" },
  { name: "LangChain", icon: "langchain", color: "#1C3C3C" },
  { name: "Vercel", icon: "vercel", color: "#000000" },
  { name: "AWS", icon: "aws", color: "#FF9900" },
  { name: "Docker", icon: "docker", color: "#2496ED" },
  { name: "GraphQL", icon: "graphql", color: "#E10098" },
  { name: "Stripe", icon: "stripe", color: "#635BFF" },
  { name: "Python", icon: "python", color: "#3776AB" },
];

export function TechStack() {
  // Duplicate the array for seamless infinite scroll
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <section
      id="tech-stack"
      style={{
        paddingTop: "var(--space-6)",
        paddingBottom: "var(--space-6)",
        position: "relative",
        overflow: "hidden",
      }}
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
            Built with Modern Tech
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
            We use battle-tested technologies that scale. No experimental frameworks on your dime.
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
          className="tech-scroll-wrapper"
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            padding: "0 var(--space-3)",
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}
        >
          <div
            className="tech-scroll"
            style={{
              display: "flex",
              gap: "var(--space-3)",
              animation: "scroll 40s linear infinite",
              width: "max-content",
            }}
          >
          {duplicatedTechs.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="tech-card-scroll"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid var(--color-border)",
                borderRadius: "14px",
                padding: "var(--space-3)",
                minWidth: "160px",
                textAlign: "center",
                transition: "all var(--motion-base) var(--ease-out)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-2)",
                cursor: "pointer",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  lineHeight: 0,
                  filter: "grayscale(0.3)",
                  transition: "all var(--motion-base) var(--ease-out)",
                  minHeight: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 0",
                }}
                className="tech-icon"
              >
                <div style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Image
                    src={`/tech-stack/${tech.icon}.svg`}
                    alt={tech.name}
                    width={48}
                    height={48}
                    style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
              </div>

              {/* Name */}
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  transition: "color var(--motion-base) var(--ease-out)",
                }}
                className="tech-name"
              >
                {tech.name}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 var(--space-3)",
        }}
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ ...fadeUpTransition, delay: 0.3 }}
          style={{
            textAlign: "center",
            marginTop: "var(--space-5)",
            fontSize: "0.9375rem",
            color: "var(--color-muted)",
            fontStyle: "italic",
          }}
        >
          And many more depending on your project needs. We&apos;re tool-agnostic and
          results-focused.
        </motion.p>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }

        .tech-card-scroll:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(230, 126, 34, 0.3);
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 8px 24px -8px rgba(230, 126, 34, 0.2);
        }

        [data-theme="light"] .tech-card-scroll:hover {
          background: rgba(0, 0, 0, 0.04);
          box-shadow: 0 8px 24px -8px rgba(230, 126, 34, 0.15),
                      0 4px 8px -4px rgba(0, 0, 0, 0.1);
        }

        .tech-card-scroll:hover .tech-name {
          color: var(--color-accent);
        }

        .tech-card-scroll:hover .tech-icon {
          filter: grayscale(0);
          transform: scale(1.1);
        }

        @media (prefers-reduced-motion: reduce) {
          .tech-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
