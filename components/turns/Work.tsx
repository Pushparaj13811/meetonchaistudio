"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, fadeUpTransition, viewportOnce, staggerContainer, staggerItem } from "@/lib/motion";
import { ProjectImage } from "@/components/ui/ProjectImage";

const projects = [
  {
    title: "Oryizon.com",
    description:
      "Full-featured e-commerce platform for a health & wellness brand selling premium organic Moringa Leaf Powder. Complete online store with product catalog, shopping cart, user authentication, and order management. Integrated payment gateway supporting UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery.",
    link: "https://oryizon.com",
    label: "Visit Website",
    external: true,
    image: "/projects/oryizon.png",
    offset: "",
  },
  // {
  //   title: "SmartSwipe",
  //   description:
  //     "Mobile payment solution enabling merchants to accept card payments through integrated POS terminals. Features Bluetooth thermal receipt printing, real-time transaction monitoring with live status updates, and comprehensive transaction history with advanced search and filters.",
  //   link: "https://play.google.com/store/apps/details?id=com.smartswipe.app",
  //   label: "View on Play Store",
  //   external: true,
  //   image: "/projects/smartswipe.png",
  //   offset: "md:mt-8",
  // },
];

/**
 * Work/Portfolio Section
 *
 * Fresh Out of the Studio
 */
export default function Work() {
  return (
    <section
      id="work"
      style={{
        paddingTop: "var(--space-6)",
        paddingBottom: "var(--space-6)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
      className="work-section"
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 var(--space-3)",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
            marginBottom: "var(--space-5)",
          }}
          className="work-header"
        >
          <div style={{ maxWidth: "640px" }}>
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
              Fresh Out of the Studio
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
              }}
            >
              A look at some of our recent favorite brews.
            </motion.p>
          </div>

          <Link href="/work">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ ...fadeUpTransition, delay: 0.15 }}
              className="view-all-link"
              style={{
                display: "none",
                alignItems: "center",
                gap: "8px",
                color: "var(--color-accent)",
                fontWeight: 600,
                transition: "color var(--motion-base) var(--ease-out)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
            >
              View All Work
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.div>
          </Link>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={staggerItem}
              className={`group ${project.offset}`}
              style={{ cursor: "pointer" }}
            >
              {/* Project Image */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "24px",
                  marginBottom: "var(--space-3)",
                  aspectRatio: "4/3",
                }}
                className="project-image-container"
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.5s ease",
                  }}
                  className="project-img"
                >
                  <ProjectImage
                    src={project.image}
                    alt={project.title}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0, 0, 0, 0.2)",
                    transition: "background 0.3s ease",
                  }}
                  className="project-overlay"
                />
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text)",
                  transition: "color var(--motion-base) var(--ease-out)",
                }}
                className="project-title"
              >
                {project.title}
              </h3>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  color: "var(--color-text-secondary)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {project.description}
              </p>

              <a
                href={project.link}
                target={project.external ? "_blank" : undefined}
                rel={project.external ? "noopener noreferrer" : undefined}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  transition: "color var(--motion-base) var(--ease-out)",
                }}
                className="project-link"
              >
                {project.label}
                <svg
                  className="w-4 h-4 project-arrow"
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
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .work-header {
            flex-direction: row !important;
            justify-content: space-between;
            align-items: flex-end;
          }
          .view-all-link {
            display: inline-flex !important;
          }
        }

        .group:hover .project-img {
          transform: scale(1.05);
        }

        .group:hover .project-overlay {
          background: transparent;
        }

        .group:hover .project-title {
          color: var(--color-accent);
        }

        .group:hover .project-link {
          color: var(--color-accent);
        }

        .group:hover .project-arrow {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}
