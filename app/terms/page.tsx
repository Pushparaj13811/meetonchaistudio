import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import Footer from "@/components/turns/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions for using MeetOnChai Studio's services.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
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
        <article
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 var(--space-3)",
          }}
        >
          {/* Header */}
          <header style={{ marginBottom: "var(--space-5)" }}>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 900,
                fontFamily: "var(--font-outfit)",
                marginBottom: "var(--space-2)",
                background: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Terms of Service
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--color-text-secondary)",
              }}
            >
              Last updated: February 20, 2026
            </p>
          </header>

          {/* Content */}
          <div
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
            }}
            className="legal-content"
          >
            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Agreement to Terms
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                By accessing or using MeetOnChai Studio's website and services,
                you agree to be bound by these Terms of Service and our Privacy
                Policy. If you do not agree to these terms, please do not use our
                services.
              </p>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Services Overview
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                MeetOnChai Studio provides custom software development services,
                including:
              </p>
              <ul
                style={{
                  marginLeft: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                }}
              >
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Web application development
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Mobile app development
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  AI and chatbot development
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  UI/UX design services
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  MVP and product development
                </li>
              </ul>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Project Engagement Process
              </h2>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-outfit)",
                  marginTop: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Discovery & Consultation
              </h3>
              <p style={{ marginBottom: "var(--space-2)" }}>
                Initial consultations are provided free of charge to understand
                your project requirements. After the discovery phase, we will
                provide a detailed proposal including scope, timeline, and
                pricing.
              </p>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-outfit)",
                  marginTop: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Project Agreement
              </h3>
              <p style={{ marginBottom: "var(--space-2)" }}>
                Work begins only after both parties sign a formal project
                agreement or statement of work (SOW) that outlines deliverables,
                timelines, payment terms, and responsibilities.
              </p>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-outfit)",
                  marginTop: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Payment Terms
              </h3>
              <p style={{ marginBottom: "var(--space-2)" }}>
                Unless otherwise specified in the project agreement:
              </p>
              <ul
                style={{
                  marginLeft: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                }}
              >
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Milestone-based projects:</strong> Payment divided into
                  phases (typically 30% upfront, 40% mid-project, 30% on
                  completion)
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Fixed-price projects:</strong> 50% upfront, 50% on
                  delivery
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Retainer agreements:</strong> Monthly payment in
                  advance
                </li>
              </ul>
              <p style={{ marginBottom: "var(--space-2)" }}>
                Invoices are due within 7 days of issuance unless otherwise
                agreed.
              </p>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Intellectual Property
              </h2>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-outfit)",
                  marginTop: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Client Ownership
              </h3>
              <p style={{ marginBottom: "var(--space-2)" }}>
                Upon full payment, you own all custom work created specifically
                for your project, including code, designs, and documentation.
              </p>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-outfit)",
                  marginTop: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Third-Party Components
              </h3>
              <p style={{ marginBottom: "var(--space-2)" }}>
                Projects may include open-source libraries, frameworks, or
                licensed components. These remain subject to their original
                licenses.
              </p>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-outfit)",
                  marginTop: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Portfolio Rights
              </h3>
              <p style={{ marginBottom: "var(--space-2)" }}>
                We reserve the right to showcase completed projects in our
                portfolio and marketing materials unless explicitly prohibited in
                the project agreement.
              </p>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Client Responsibilities
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                To ensure successful project delivery, clients must:
              </p>
              <ul
                style={{
                  marginLeft: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                }}
              >
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Provide timely access to necessary resources, accounts, and
                  information
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Respond to requests for feedback within agreed timeframes
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Provide clear, written requirements and change requests
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Make payments according to the agreed schedule
                </li>
              </ul>
              <p style={{ marginBottom: "var(--space-2)" }}>
                Delays caused by lack of client input may result in timeline
                adjustments and additional fees.
              </p>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Changes and Scope Creep
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                Change requests outside the original project scope will be
                documented and may require additional time and cost. We'll
                provide a written estimate before proceeding with any
                out-of-scope work.
              </p>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Warranties and Guarantees
              </h2>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-outfit)",
                  marginTop: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Bug Fixes
              </h3>
              <p style={{ marginBottom: "var(--space-2)" }}>
                We provide a 30-day warranty period after project delivery for
                bug fixes related to the original scope. This does not cover new
                features or issues caused by third-party services.
              </p>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-outfit)",
                  marginTop: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                No Absolute Guarantees
              </h3>
              <p style={{ marginBottom: "var(--space-2)" }}>
                While we strive for excellence, we cannot guarantee specific
                business outcomes, user adoption rates, or performance metrics
                beyond technical specifications agreed upon in writing.
              </p>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Limitation of Liability
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                MeetOnChai Studio's total liability for any claims arising from
                our services shall not exceed the total amount paid by the client
                for the specific project in question. We are not liable for:
              </p>
              <ul
                style={{
                  marginLeft: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                }}
              >
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Loss of profits, revenue, or business opportunities
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Third-party service failures or data breaches
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Misuse of delivered products by the client or end users
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Force majeure events beyond our reasonable control
                </li>
              </ul>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Confidentiality
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                We treat all client information as confidential and will not
                disclose it to third parties without permission, except as
                required by law or to service providers necessary for project
                completion.
              </p>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Termination
              </h2>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-outfit)",
                  marginTop: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                By Client
              </h3>
              <p style={{ marginBottom: "var(--space-2)" }}>
                You may terminate a project with 14 days' written notice. You
                will be billed for all work completed up to the termination date,
                plus any non-refundable expenses already incurred.
              </p>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-outfit)",
                  marginTop: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                By MeetOnChai Studio
              </h3>
              <p style={{ marginBottom: "var(--space-2)" }}>
                We may terminate services if:
              </p>
              <ul
                style={{
                  marginLeft: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                }}
              >
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Payment is more than 14 days overdue
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Client fails to provide necessary materials or feedback
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Client engages in abusive behavior toward our team
                </li>
              </ul>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Dispute Resolution
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                In the event of any dispute, both parties agree to first attempt
                resolution through good-faith negotiation. If negotiation fails,
                disputes shall be resolved through binding arbitration in
                accordance with the laws of [Your Jurisdiction].
              </p>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Website Use
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                You may not:
              </p>
              <ul
                style={{
                  marginLeft: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                }}
              >
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Use our website for any unlawful purpose
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Attempt to gain unauthorized access to our systems
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Copy, modify, or distribute our website content without
                  permission
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Use automated tools to scrape or collect data from our website
                </li>
              </ul>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Changes to These Terms
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                We reserve the right to modify these terms at any time. Changes
                will be posted on this page with an updated "Last updated" date.
                Continued use of our services after changes constitutes
                acceptance of the new terms.
              </p>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Governing Law
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                These terms are governed by the laws of India and Nepal, where
                applicable, without regard to conflict of law principles.
              </p>
            </section>

            <section style={{ marginBottom: "var(--space-5)" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-outfit)",
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text-primary)",
                }}
              >
                Contact Us
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                Questions about these terms? Get in touch:
              </p>
              <div
                className="contact-info-card"
                style={{
                  borderRadius: "16px",
                  padding: "var(--space-3)",
                }}
              >
                <p style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:hello@meetonchai.com"
                    style={{
                      color: "var(--color-accent)",
                      textDecoration: "underline",
                    }}
                  >
                    hello@meetonchai.com
                  </a>
                </p>
                <p style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Phone (Nepal):</strong> +977 9804301484
                </p>
                <p>
                  <strong>Phone (India):</strong> +91 7635022185
                </p>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
