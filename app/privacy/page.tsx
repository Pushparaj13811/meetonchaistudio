import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import Footer from "@/components/turns/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how MeetOnChai Studio collects, uses, and protects your personal information.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
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
              Privacy Policy
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
                Introduction
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                At MeetOnChai Studio ("we," "our," or "us"), we respect your
                privacy and are committed to protecting your personal data. This
                privacy policy explains how we collect, use, and safeguard your
                information when you visit our website or use our services.
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
                Information We Collect
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                We collect information that you provide directly to us,
                including:
              </p>
              <ul
                style={{
                  marginLeft: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                }}
              >
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Contact Information:</strong> Name, email address,
                  phone number when you fill out contact forms or book a call
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Project Information:</strong> Details about your
                  project requirements, budget, and timeline
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Communication Data:</strong> Content of messages,
                  emails, and meeting notes
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Usage Data:</strong> Information about how you use our
                  website, including analytics data via Google Analytics
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
                How We Use Your Information
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                We use the information we collect to:
              </p>
              <ul
                style={{
                  marginLeft: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                }}
              >
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Respond to your inquiries and schedule consultations
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Provide and improve our development services
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Send project updates and important notifications
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Analyze website usage to improve user experience
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  Comply with legal obligations
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
                Data Sharing and Disclosure
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                We do not sell your personal information. We may share your data
                with:
              </p>
              <ul
                style={{
                  marginLeft: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                }}
              >
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Service Providers:</strong> Email services (Resend),
                  analytics tools (Google Analytics), and communication platforms
                  (Jitsi)
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Legal Requirements:</strong> When required by law or to
                  protect our rights
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Business Transfers:</strong> In connection with a
                  merger, acquisition, or sale of assets
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
                Data Security
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                We implement appropriate technical and organizational measures to
                protect your personal data against unauthorized access, loss, or
                misuse. However, no internet transmission is 100% secure, and we
                cannot guarantee absolute security.
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
                Your Rights
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                Depending on your location, you may have the following rights:
              </p>
              <ul
                style={{
                  marginLeft: "var(--space-3)",
                  marginBottom: "var(--space-2)",
                }}
              >
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Access:</strong> Request a copy of your personal data
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Correction:</strong> Request correction of inaccurate
                  data
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Deletion:</strong> Request deletion of your personal
                  data
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Objection:</strong> Object to processing of your data
                </li>
                <li style={{ marginBottom: "var(--space-1)" }}>
                  <strong>Portability:</strong> Request transfer of your data
                </li>
              </ul>
              <p style={{ marginBottom: "var(--space-2)" }}>
                To exercise these rights, contact us at hello@meetonchai.com.
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
                Cookies and Tracking
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                We use Google Analytics to understand how visitors use our
                website. Google Analytics uses cookies to collect anonymous
                information about your browsing behavior. You can opt out of
                Google Analytics by installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--color-accent)",
                    textDecoration: "underline",
                  }}
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
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
                Data Retention
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                We retain your personal information for as long as necessary to
                fulfill the purposes outlined in this policy, unless a longer
                retention period is required by law. Project-related data is
                typically retained for 3 years after project completion.
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
                International Transfers
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                Your information may be transferred to and processed in countries
                other than your country of residence. We ensure appropriate
                safeguards are in place to protect your data in accordance with
                this privacy policy.
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
                Children's Privacy
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                Our services are not directed to individuals under 16 years of
                age. We do not knowingly collect personal information from
                children. If you become aware that a child has provided us with
                personal data, please contact us.
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
                Changes to This Policy
              </h2>
              <p style={{ marginBottom: "var(--space-2)" }}>
                We may update this privacy policy from time to time. We will
                notify you of significant changes by posting the new policy on
                this page with an updated "Last updated" date. We encourage you
                to review this policy periodically.
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
                If you have questions about this privacy policy or our data
                practices, please contact us:
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
