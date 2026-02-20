import Hero from "@/components/turns/Hero";
import Philosophy from "@/components/turns/Philosophy";
import Services from "@/components/turns/Services";
import Work from "@/components/turns/Work";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { TechStack } from "@/components/sections/TechStack";
import { Stats } from "@/components/sections/Stats";
import { FAQ } from "@/components/sections/FAQ";
import { Newsletter } from "@/components/sections/Newsletter";
import Testimonials from "@/components/turns/Testimonials";
import CTA from "@/components/turns/CTA";
import Footer from "@/components/turns/Footer";

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
