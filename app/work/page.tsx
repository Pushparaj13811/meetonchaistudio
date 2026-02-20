"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, fadeUpTransition, viewportOnce, staggerContainer, staggerItem } from "@/lib/motion";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Navigation } from "@/components/layout/Navigation";
import Footer from "@/components/turns/Footer";

const caseStudies = [
  {
    title: "Oryizon.com",
    description:
      "Full-featured e-commerce platform for a health & wellness brand selling premium organic Moringa Leaf Powder. Complete online store with product catalog, shopping cart, user authentication, and order management. Integrated payment gateway supporting UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery. Features include inventory management, order tracking, 7-day returns, shipping calculations, FSSAI certification display, and mobile-first responsive design optimized for Indian market conversions.",
    link: "https://oryizon.com",
    label: "Visit Website",
    external: true,
    image: "/projects/oryizon.png",
    tags: ["E-Commerce", "Payment Gateway", "Inventory Management"],
  },
  // {
  //   title: "SmartSwipe",
  //   description:
  //     "Mobile payment solution enabling merchants to accept card payments through integrated POS terminals. Features Bluetooth thermal receipt printing, real-time transaction monitoring with live status updates, full and partial refund processing, and comprehensive transaction history with advanced search and filters. Includes daily, weekly, and monthly analytics dashboard, offline transaction queuing for uninterrupted service, and secure backend synchronization. Built with enterprise-grade architecture and currently serving merchants in production.",
  //   link: "https://play.google.com/store/apps/details?id=com.smartswipe.app",
  //   label: "View on Play Store",
  //   external: true,
  //   image: "/projects/smartswipe.png",
  //   tags: ["Mobile App", "POS System", "Payment Processing"],
  // },
  {
    title: "UniPay",
    description:
      "Unified payment gateway abstraction layer providing a consistent, type-safe interface across multiple payment providers. Solves payment integration fragmentation by enabling developers to write payment logic once and deploy across multiple providers without vendor lock-in. Features intelligent routing with automatic request distribution, webhook normalization for standardized event handling, comprehensive error handling, and multi-gateway support. Currently supports Stripe and Razorpay with full TypeScript support and production-ready architecture.",
    link: "https://unipay.hpm.com.np",
    label: "View Project",
    external: true,
    image: "/projects/unipay.png",
    tags: ["Payment Gateway", "API Integration", "Developer Tools"],
  },
  {
    title: "ok.css",
    description:
      "Visual CSS generator platform offering seventeen precision tools for creating CSS effects without technical guesswork. Streamlines CSS creation with real-time visual editors for shadows, glassmorphism, gradients, neumorphism, text styling, transforms, filters, animations, and shapes. Features multi-format code export (CSS, Tailwind, SCSS, React), shareable links, and instant preview functionality. Eliminates trial-and-error by providing intuitive visual editors that generate production-ready code instantly.",
    link: "https://okcss.hpm.com.np",
    label: "Visit Website",
    external: true,
    image: "/projects/okcss.png",
    tags: ["CSS Tools", "Developer Tools", "Code Generator"],
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Extract all unique categories from case studies
  const categories = useMemo(() => {
    const allTags = caseStudies.flatMap((study) => study.tags);
    return ["All", ...Array.from(new Set(allTags))];
  }, []);

  // Filter case studies based on active filter
  const filteredCaseStudies = useMemo(() => {
    if (activeFilter === "All") return caseStudies;
    return caseStudies.filter((study) =>
      study.tags.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <>
      <Navigation />
      <main id="main-content" style={{ minHeight: "100vh", paddingTop: "80px" }}>
      {/* Header */}
      <section
        style={{
          paddingTop: "var(--space-5)",
          paddingBottom: "var(--space-5)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 var(--space-3)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
                marginBottom: "var(--space-3)",
                transition: "color var(--motion-base) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>

            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 900,
                marginBottom: "var(--space-3)",
                color: "var(--color-text)",
              }}
            >
              Fresh Out of the Studio
            </h1>

            <p
              style={{
                fontSize: "1.25rem",
                color: "var(--color-text-secondary)",
                maxWidth: "720px",
                lineHeight: 1.6,
              }}
            >
              A look at some of our favorite brews we've crafted for our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section
        style={{
          paddingTop: "var(--space-4)",
          paddingBottom: "var(--space-3)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 var(--space-3)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                style={{
                  padding: "12px 24px",
                  borderRadius: "50px",
                  border: "1px solid",
                  borderColor:
                    activeFilter === category
                      ? "var(--color-accent)"
                      : "rgba(255, 255, 255, 0.1)",
                  background:
                    activeFilter === category
                      ? "var(--color-accent)"
                      : "rgba(255, 255, 255, 0.02)",
                  color:
                    activeFilter === category ? "#fff" : "var(--color-text)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all var(--motion-base) var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== category) {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== category) {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.02)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.1)";
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p
            style={{
              textAlign: "center",
              marginTop: "var(--space-3)",
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Showing {filteredCaseStudies.length} project
            {filteredCaseStudies.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section
        style={{
          paddingTop: "var(--space-5)",
          paddingBottom: "var(--space-6)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 var(--space-3)",
          }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            viewport={viewportOnce}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-5)",
            }}
          >
            {filteredCaseStudies.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className="group case-study-card"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "24px",
                    padding: "var(--space-4)",
                    transition: "all var(--motion-base) var(--ease-out)",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "var(--space-4)",
                      alignItems: "center",
                    }}
                    className="case-study-grid"
                  >
                    {/* Image */}
                    {item.image && (
                      <div
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "16px",
                          background: "#141417",
                          aspectRatio: "16/9",
                          order: isEven ? 1 : 2,
                        }}
                        className="case-study-image-container"
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            transition: "transform 0.5s ease",
                          }}
                          className="case-study-img"
                        >
                          <ProjectImage src={item.image} alt={item.title} />
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0, 0, 0, 0.2)",
                            transition: "background 0.3s ease",
                          }}
                          className="case-study-overlay"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div
                      style={{
                        order: isEven ? 2 : 1,
                      }}
                      className="case-study-content"
                    >
                      {/* Tags */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginBottom: "var(--space-3)",
                        }}
                      >
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "0.75rem",
                              padding: "4px 12px",
                              borderRadius: "9999px",
                              background: "rgba(230, 126, 34, 0.1)",
                              color: "var(--color-accent)",
                              fontWeight: 500,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "clamp(1.5rem, 3vw, 2rem)",
                          fontWeight: 800,
                          marginBottom: "var(--space-3)",
                          color: "var(--color-text)",
                          transition: "color var(--motion-base) var(--ease-out)",
                        }}
                        className="case-study-title"
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: "1rem",
                          lineHeight: 1.7,
                          color: "var(--color-text-secondary)",
                          marginBottom: "var(--space-3)",
                        }}
                      >
                        {item.description}
                      </p>

                      {/* Link */}
                      <a
                        href={item.link}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "var(--color-text)",
                          transition: "color var(--motion-base) var(--ease-out)",
                        }}
                        className="case-study-link"
                      >
                        {item.label}
                        <svg
                          className="w-4 h-4 case-study-arrow"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{
                            transition: "transform var(--motion-base) var(--ease-out)",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        @media (min-width: 768px) {
          .case-study-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        .case-study-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-4px);
        }

        .group:hover .case-study-img {
          transform: scale(1.05);
        }

        .group:hover .case-study-overlay {
          background: transparent;
        }

        .group:hover .case-study-title {
          color: var(--color-accent);
        }

        .group:hover .case-study-link {
          color: var(--color-accent);
        }

        .group:hover .case-study-arrow {
          transform: translateX(4px);
        }
      `}</style>
      </main>
      <Footer />
    </>
  );
}
