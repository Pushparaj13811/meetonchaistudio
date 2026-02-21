"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { analytics } from "@/lib/analytics";

/**
 * Hero Section
 *
 * Premium dark design with:
 * - Fixed glassmorphism navigation
 * - Bold headline with gradient text
 * - Hero image with float animation
 * - Dual CTAs (primary + secondary)
 * - Background glow effects
 */
export default function Hero() {
  return (
    <>
      <Navigation />

      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "80px",
          overflow: "hidden",
        }}
      >
        {/* Background Glow Effects */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: 0,
            width: "384px",
            height: "384px",
            background: "rgba(230, 126, 34, 0.2)",
            borderRadius: "50%",
            mixBlendMode: "screen",
            filter: "blur(100px)",
            opacity: 0.5,
          }}
          className="animate-pulse-slow hero-glow-1"
        />
        <div
          style={{
            position: "absolute",
            bottom: "25%",
            right: 0,
            width: "384px",
            height: "384px",
            background: "rgba(249, 115, 22, 0.1)",
            borderRadius: "50%",
            mixBlendMode: "screen",
            filter: "blur(100px)",
            opacity: 0.5,
          }}
          className="hero-glow-2"
        />

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 var(--space-3)",
            position: "relative",
            zIndex: 10,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-5)",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: "640px" }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: "var(--space-3)",
                }}
              >
                Brewing Digital <br />
                <span className="text-gradient">Excellence.</span>
              </h1>

              <p
                style={{
                  fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
                  color: "var(--color-text-secondary)",
                  marginBottom: "var(--space-4)",
                  lineHeight: 1.6,
                  maxWidth: "560px",
                }}
              >
                We sit down, understand your vision, and code scalable,
                beautiful web and mobile applications that grow your business.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-2)",
                }}
                className="hero-ctas"
              >
                <Link
                  href="/talk"
                  onClick={() => analytics.ctaClick("Lets Grab a Chai", "hero")}
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "var(--color-accent)",
                    color: "#fff",
                    padding: "16px 32px",
                    borderRadius: "9999px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    transition: "all var(--motion-base) var(--ease-out)",
                    boxShadow: "0 0 20px rgba(230, 126, 34, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-accent-hover)";
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(230, 126, 34, 0.5)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-accent)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(230, 126, 34, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Let's Grab a Chai ☕
                </Link>

                <a
                  href="#work"
                  onClick={() => analytics.ctaClick("View Our Work", "hero")}
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(156, 163, 175, 0.3)",
                    color: "var(--color-text)",
                    padding: "16px 32px",
                    borderRadius: "9999px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    transition: "all var(--motion-base) var(--ease-out)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(156, 163, 175, 0.3)";
                    e.currentTarget.style.color = "var(--color-text)";
                  }}
                >
                  View Our Work
                </a>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "560px",
                margin: "0 auto",
              }}
              className="hero-image"
            >
              <div className="bg-glow" />
              <div className="animate-float">
                <ResponsiveImage
                  src="/hero.webp"
                  alt="MeetOnChai Hero Visual"
                  width={1920}
                  height={1434}
                  priority
                  className="hero-img"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .hero-ctas {
            flex-direction: row !important;
          }
        }

        .hero-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5));
        }
      `}</style>
    </>
  );
}
