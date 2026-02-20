"use client";

import { Navigation } from "@/components/layout/Navigation";
import Footer from "@/components/turns/Footer";
import Image from "next/image";

const metadata = {
  title: "About Us",
  description:
    "Meet the team behind MeetOnChai Studio. We're a passionate team building MVPs, internal tools, and AI solutions that survive real users.",
  openGraph: {
    title: "About MeetOnChai Studio",
    description:
      "Meet the team behind MeetOnChai Studio. We're passionate about building products that work.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main
        id="main-content"
        style={{
          minHeight: "100vh",
          paddingTop: "120px",
          paddingBottom: "var(--space-6)",
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 var(--space-3)",
            marginBottom: "var(--space-6)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "var(--space-5)",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 900,
                fontFamily: "var(--font-outfit)",
                marginBottom: "var(--space-2)",
                background: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Building Products That Work
            </h1>
            <p
              style={{
                fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
                color: "var(--color-text-secondary)",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              We're a development studio that turns ideas into production-ready
              products. No fluff, just code that ships.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 var(--space-3)",
            marginBottom: "var(--space-6)",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--color-border)",
              borderRadius: "24px",
              padding: "var(--space-5)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            className="about-story-card"
          >
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                fontWeight: 800,
                fontFamily: "var(--font-outfit)",
                marginBottom: "var(--space-3)",
                color: "var(--color-text-primary)",
              }}
            >
              Our Story
            </h2>
            <div
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              <p style={{ marginBottom: "var(--space-2)" }}>
                MeetOnChai started from a simple observation: most development
                agencies over-promise and under-deliver. They sell dreams but
                ship nightmares.
              </p>
              <p style={{ marginBottom: "var(--space-2)" }}>
                We took a different approach. Instead of flashy pitches, we
                focus on building products that actually work. Products that can
                handle real users, real traffic, and real problems.
              </p>
              <p>
                Today, we work with startups and businesses who need MVPs that
                launch fast, internal tools that boost productivity, and AI
                solutions that add real value — not just buzzwords.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 var(--space-3)",
            marginBottom: "var(--space-6)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 800,
              fontFamily: "var(--font-outfit)",
              marginBottom: "var(--space-4)",
              textAlign: "center",
            }}
          >
            What Drives Us
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-3)",
            }}
          >
            {[
              {
                title: "Ship Fast",
                description:
                  "Speed matters. We believe in iterative development and getting your product in front of users quickly. Perfect is the enemy of shipped.",
              },
              {
                title: "Build Right",
                description:
                  "Fast doesn't mean sloppy. We write clean, maintainable code that scales. Your future self (and developers) will thank us.",
              },
              {
                title: "Stay Honest",
                description:
                  "No BS. If something's a bad idea, we'll tell you. If a deadline is unrealistic, we'll say so. Honesty over easy yeses.",
              },
              {
                title: "Solve Problems",
                description:
                  "We're not just code monkeys. We think about your business goals, user experience, and long-term sustainability.",
              },
            ].map((value, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  padding: "var(--space-4)",
                  transition: "all var(--motion-base) var(--ease-out)",
                  cursor: "default",
                }}
                className="value-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.borderColor =
                    "var(--color-border-hover)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.02)";
                  e.currentTarget.style.borderColor =
                    "var(--color-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-outfit)",
                    marginBottom: "var(--space-2)",
                    color: "var(--color-accent)",
                  }}
                >
                  {value.title}
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Approach Section */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 var(--space-3)",
            marginBottom: "var(--space-6)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 800,
              fontFamily: "var(--font-outfit)",
              marginBottom: "var(--space-4)",
              textAlign: "center",
            }}
          >
            How We Work
          </h2>
          <div
            style={{
              display: "grid",
              gap: "var(--space-3)",
            }}
          >
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We start by understanding your goals, constraints, and success metrics. No cookie-cutter solutions.",
              },
              {
                step: "02",
                title: "Planning",
                description:
                  "We break down the project into phases, prioritize features, and set realistic timelines. You'll know exactly what to expect.",
              },
              {
                step: "03",
                title: "Building",
                description:
                  "We ship working code weekly. You see progress, give feedback, and we iterate. No black boxes.",
              },
              {
                step: "04",
                title: "Launch & Support",
                description:
                  "We help you launch smoothly and stick around to fix bugs, optimize performance, and add features as needed.",
              },
            ].map((phase, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "var(--space-3)",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  padding: "var(--space-4)",
                  alignItems: "start",
                }}
                className="phase-card"
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    fontFamily: "var(--font-outfit)",
                    background:
                      "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {phase.step}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-outfit)",
                      marginBottom: "var(--space-1)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {phase.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 var(--space-3)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--color-border)",
              borderRadius: "24px",
              padding: "var(--space-5)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            className="about-cta-card"
          >
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                fontWeight: 800,
                fontFamily: "var(--font-outfit)",
                marginBottom: "var(--space-2)",
              }}
            >
              Let's Build Something Together
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--color-text-secondary)",
                marginBottom: "var(--space-4)",
                maxWidth: "600px",
                margin: "0 auto var(--space-4)",
                lineHeight: 1.7,
              }}
            >
              Have an idea? Need help scaling your product? Let's talk over
              chai (or coffee, we don't judge).
            </p>
            <a
              href="/talk"
              style={{
                display: "inline-block",
                background: "var(--color-accent)",
                color: "#fff",
                padding: "16px 40px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1.125rem",
                transition: "all var(--motion-base) var(--ease-out)",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(230, 126, 34, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(230, 126, 34, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(230, 126, 34, 0.4)";
              }}
            >
              Book a Call →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
