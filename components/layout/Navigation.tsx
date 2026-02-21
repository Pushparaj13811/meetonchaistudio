"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { analytics } from "@/lib/analytics";

/**
 * Fixed navigation bar with glassmorphism effect
 * Matches the reference design exactly
 */
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`glass-nav ${scrolled ? "scrolled" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
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
            alignItems: "center",
            justifyContent: "space-between",
            height: "80px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => analytics.navigationClick("Logo", "header")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "1.5rem",
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
            }}
          >
            <div style={{ position: "relative", width: "40px", height: "40px" }}>
              <Image
                src="/logo.webp"
                alt="MeetOnChai Logo"
                width={40}
                height={40}
                priority
                className="logo-dark-theme"
                style={{
                  objectFit: "contain",
                }}
              />
              <Image
                src="/logo-dark.webp"
                alt="MeetOnChai Logo"
                width={40}
                height={40}
                priority
                className="logo-light-theme"
                style={{
                  objectFit: "contain",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </div>
            <span style={{ display: "flex" }}>
              MeetOn<span style={{ color: "var(--color-accent)" }}>Chai</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div
            style={{
              alignItems: "center",
              gap: "var(--space-4)",
            }}
            className="desktop-menu"
          >
            <a
              href="/#services"
              onClick={() => analytics.navigationClick("Services", "header")}
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-muted)",
                transition: "color var(--motion-base) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-muted)";
              }}
            >
              Services
            </a>
            <Link
              href="/work"
              onClick={() => analytics.navigationClick("Work", "header")}
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-muted)",
                transition: "color var(--motion-base) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-muted)";
              }}
            >
              Work
            </Link>
            <Link
              href="/about"
              onClick={() => analytics.navigationClick("About", "header")}
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-muted)",
                transition: "color var(--motion-base) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-muted)";
              }}
            >
              About
            </Link>
            <a
              href="/#testimonials"
              onClick={() => analytics.navigationClick("Testimonials", "header")}
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-muted)",
                transition: "color var(--motion-base) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-muted)";
              }}
            >
              Testimonials
            </a>
            <ThemeToggle />
            <Link
              href="/talk"
              onClick={() => analytics.ctaClick("Lets Talk", "header")}
              style={{
                backgroundColor: "var(--color-accent)",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 600,
                transition: "all var(--motion-base) var(--ease-out)",
                boxShadow: "0 0 15px rgba(230, 126, 34, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-accent-hover)";
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(230, 126, 34, 0.5)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-accent)";
                e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(230, 126, 34, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile Theme Toggle & Menu Button */}
          <div
            style={{
              alignItems: "center",
              gap: "var(--space-2)",
            }}
            className="mobile-controls"
          >
            <ThemeToggle />
            <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-button"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              zIndex: 60,
            }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              style={{
                width: "24px",
                height: "2px",
                background: "var(--color-text)",
                borderRadius: "2px",
                transition: "all 0.3s ease",
              }}
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{
                width: "24px",
                height: "2px",
                background: "var(--color-text)",
                borderRadius: "2px",
                transition: "all 0.3s ease",
              }}
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              style={{
                width: "24px",
                height: "2px",
                background: "var(--color-text)",
                borderRadius: "2px",
                transition: "all 0.3s ease",
              }}
            />
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={mobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mobile-menu-overlay"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "400px",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          zIndex: 55,
          padding: "100px 32px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
      >
        <a
          href="/#services"
          onClick={() => {
            analytics.navigationClick("Services", "mobile_menu");
            setMobileMenuOpen(false);
          }}
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-text)",
            padding: "var(--space-2) 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            transition: "color var(--motion-base) var(--ease-out)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-text)";
          }}
        >
          Services
        </a>
        <Link
          href="/work"
          onClick={() => {
            analytics.navigationClick("Work", "mobile_menu");
            setMobileMenuOpen(false);
          }}
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-text)",
            padding: "var(--space-2) 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            transition: "color var(--motion-base) var(--ease-out)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-text)";
          }}
        >
          Work
        </Link>
        <Link
          href="/about"
          onClick={() => {
            analytics.navigationClick("About", "mobile_menu");
            setMobileMenuOpen(false);
          }}
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-text)",
            padding: "var(--space-2) 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            transition: "color var(--motion-base) var(--ease-out)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-text)";
          }}
        >
          About
        </Link>
        <a
          href="/#testimonials"
          onClick={() => {
            analytics.navigationClick("Testimonials", "mobile_menu");
            setMobileMenuOpen(false);
          }}
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-text)",
            padding: "var(--space-2) 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            transition: "color var(--motion-base) var(--ease-out)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-text)";
          }}
        >
          Testimonials
        </a>
        <Link
          href="/talk"
          onClick={() => {
            analytics.ctaClick("Lets Talk", "mobile_menu");
            setMobileMenuOpen(false);
          }}
          style={{
            backgroundColor: "var(--color-accent)",
            color: "#fff",
            padding: "16px 32px",
            borderRadius: "9999px",
            fontSize: "1.125rem",
            fontWeight: 600,
            textAlign: "center",
            marginTop: "var(--space-3)",
            boxShadow: "0 0 20px rgba(230, 126, 34, 0.4)",
            transition: "all var(--motion-base) var(--ease-out)",
          }}
        >
          Let's Talk
        </Link>
      </motion.div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 54,
          }}
        />
      )}

    </nav>
  );
}
