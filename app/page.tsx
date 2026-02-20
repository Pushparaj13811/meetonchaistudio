import dynamic from "next/dynamic";
import Hero from "@/components/turns/Hero";
import Philosophy from "@/components/turns/Philosophy";
import { Stats } from "@/components/sections/Stats";

// Lazy load below-the-fold components
const Services = dynamic(() => import("@/components/turns/Services"), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});
const Work = dynamic(() => import("@/components/turns/Work"), {
  loading: () => <div style={{ minHeight: "600px" }} />,
});
const HowWeWork = dynamic(() => import("@/components/sections/HowWeWork").then(mod => ({ default: mod.HowWeWork })), {
  loading: () => <div style={{ minHeight: "500px" }} />,
});
const TechStack = dynamic(() => import("@/components/sections/TechStack").then(mod => ({ default: mod.TechStack })), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});
const Testimonials = dynamic(() => import("@/components/turns/Testimonials"), {
  loading: () => <div style={{ minHeight: "500px" }} />,
});
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(mod => ({ default: mod.FAQ })), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});
const Newsletter = dynamic(() => import("@/components/sections/Newsletter").then(mod => ({ default: mod.Newsletter })), {
  loading: () => <div style={{ minHeight: "300px" }} />,
});
const CTA = dynamic(() => import("@/components/turns/CTA"), {
  loading: () => <div style={{ minHeight: "300px" }} />,
});
const Footer = dynamic(() => import("@/components/turns/Footer"), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});

/**
 * Meet on Chai — homepage
 *
 * Flow:
 * - Hero
 * - Philosophy
 * - Services (includes work types)
 * - Work
 * - How We Work
 * - Testimonials
 * - CTA
 * - Footer
 */
export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MeetOnChai Studio",
    alternateName: "MeetOnChai",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://meetonchai.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://meetonchai.com"}/logo-512.png`,
    description:
      "Premium web development, mobile apps, AI solutions, and UI/UX design studio",
    email: "hello@meetonchai.com",
    sameAs: [
      "https://twitter.com/meetonchai",
      "https://linkedin.com/company/meetonchai",
      "https://github.com/meetonchai",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    serviceType: [
      "Web Development",
      "Mobile App Development",
      "AI Development",
      "Chatbot Development",
      "UI/UX Design",
      "MVP Development",
    ],
    areaServed: "Worldwide",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "12",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content">
        <Hero />
        <Philosophy />
        <Stats />
        <Services />
        <Work />
        <HowWeWork />
        <TechStack />
        <Testimonials />
        <FAQ />
        <Newsletter />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
