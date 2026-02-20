"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpTransition, viewportOnce } from "@/lib/motion";
import { InlineSpinner } from "@/components/ui/LoadingSpinner";
import { Mail } from "lucide-react";

/**
 * Newsletter Subscription Component
 *
 * Captures email addresses for the newsletter
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      // TODO: Replace with actual newsletter API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus("success");
      setMessage("Thanks for subscribing! Check your email for confirmation.");
      setEmail("");

      // Reset message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      style={{
        paddingTop: "var(--space-6)",
        paddingBottom: "var(--space-6)",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 var(--space-3)",
        }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={fadeUpTransition}
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid var(--color-border)",
            borderRadius: "24px",
            padding: "var(--space-5)",
            textAlign: "center",
          }}
          className="newsletter-card"
        >
          {/* Icon */}
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto var(--space-3)",
              background: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Mail size={32} color="#fff" />
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 800,
              marginBottom: "var(--space-2)",
              color: "var(--color-text)",
            }}
          >
            Stay in the Loop
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-4)",
              maxWidth: "500px",
              margin: "0 auto var(--space-4)",
              lineHeight: 1.7,
            }}
          >
            Get weekly insights on web development, AI, and building products
            that don't crash at 3 AM.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2)",
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-2)",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
                className="newsletter-form"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  style={{
                    flex: "1",
                    minWidth: "250px",
                    padding: "16px 20px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: "var(--color-text)",
                    fontSize: "1rem",
                    fontFamily: "var(--font-body)",
                    outline: "none",
                    transition: "all var(--motion-base) var(--ease-out)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.05)";
                  }}
                />

                <button
                  type="submit"
                  disabled={loading || !email}
                  style={{
                    padding: "16px 32px",
                    background: loading ? "#666" : "var(--color-accent)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all var(--motion-base) var(--ease-out)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && email) {
                      e.currentTarget.style.background =
                        "var(--color-accent-hover)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--color-accent)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {loading ? (
                    <>
                      <InlineSpinner size={18} />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {/* Status Message */}
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontSize: "0.9375rem",
                    color: status === "success" ? "#10b981" : "#ef4444",
                    textAlign: "center",
                    marginTop: "8px",
                  }}
                >
                  {message}
                </motion.p>
              )}
            </div>
          </form>

          {/* Privacy Note */}
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-muted)",
              marginTop: "var(--space-3)",
            }}
          >
            No spam. Unsubscribe anytime. We respect your inbox.
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 600px) {
          .newsletter-form {
            flex-direction: column !important;
          }
          .newsletter-form input {
            min-width: 100% !important;
          }
          .newsletter-form button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
