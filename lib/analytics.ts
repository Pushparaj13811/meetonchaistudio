/**
 * Google Analytics 4 Event Tracking Utilities
 *
 * Centralized event tracking for consistent analytics across the app
 */

import "@/types/analytics";

/**
 * Send a custom event to Google Analytics
 */
export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
    console.log(`[GA Event] ${eventName}`, params);
  }
};

/**
 * Booking Funnel Events
 */
export const analytics = {
  // Booking funnel
  viewBookingForm: (source?: string) => {
    trackEvent("view_booking_form", {
      service_type: "consultation",
      source: source || "direct",
    });
  },

  selectTimeSlot: (date: string, time: string) => {
    trackEvent("select_time_slot", {
      date,
      time,
      service: "consultation",
    });
  },

  submitBooking: (data: { name: string; email: string; date: string; time: string }) => {
    trackEvent("submit_booking", {
      service: "consultation",
      date: data.date,
      time: data.time,
      value: 0,
    });
  },

  bookingConfirmed: (bookingId: string) => {
    trackEvent("booking_confirmed", {
      booking_id: bookingId,
      service: "consultation",
    });
  },

  bookingCancelled: (bookingId: string, reason?: string) => {
    trackEvent("booking_cancelled", {
      booking_id: bookingId,
      reason: reason || "user_cancelled",
    });
  },

  // Contact & Forms
  contactFormSubmit: (location: string) => {
    trackEvent("contact_form_submit", {
      form_location: location,
    });
  },

  newsletterSignup: (source: string) => {
    trackEvent("newsletter_signup", {
      source,
    });
  },

  // User Engagement
  ctaClick: (ctaName: string, location: string) => {
    trackEvent("cta_click", {
      cta_name: ctaName,
      cta_location: location,
    });
  },

  viewProject: (projectName: string, projectType: string) => {
    trackEvent("view_project", {
      project_name: projectName,
      project_type: projectType,
    });
  },

  // Navigation
  navigationClick: (linkName: string, location: string) => {
    trackEvent("navigation_click", {
      link_name: linkName,
      location,
    });
  },

  externalLinkClick: (linkName: string, url: string, location: string) => {
    trackEvent("click", {
      link_name: linkName,
      link_url: url,
      location,
      outbound: true,
    });
  },

  scrollDepth: (percent: number) => {
    trackEvent("scroll", {
      percent_scrolled: percent,
    });
  },

  timeOnPage: (durationSeconds: number, pagePath: string) => {
    trackEvent("time_on_page", {
      duration_seconds: durationSeconds,
      page_path: pagePath,
    });
  },

  // Performance
  pageLoad: (loadTime: number, pagePath: string) => {
    trackEvent("timing_complete", {
      name: "page_load",
      value: loadTime,
      event_category: "Page Performance",
      page_path: pagePath,
    });
  },

  apiCall: (endpoint: string, duration: number, status: "success" | "error") => {
    trackEvent("timing_complete", {
      name: `api_${endpoint}`,
      value: duration,
      event_category: "API Performance",
      status,
    });
  },

  // User Properties
  setUserProperties: (properties: {
    user_type?: string;
    preferred_service?: string;
    timezone?: string;
    [key: string]: string | undefined;
  }) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("set", "user_properties", properties);
      console.log("[GA User Properties]", properties);
    }
  },

  // Theme & Preferences
  themeChange: (theme: "light" | "dark") => {
    trackEvent("theme_change", {
      theme,
    });
  },

  // Consent
  consentUpdate: (analytics: boolean, marketing: boolean, functionality: boolean) => {
    trackEvent("consent_update", {
      analytics: analytics ? "granted" : "denied",
      marketing: marketing ? "granted" : "denied",
      functionality: functionality ? "granted" : "denied",
    });
  },

  // Service Interest
  serviceInterest: (serviceName: string, action: "view" | "click" | "inquire") => {
    trackEvent("service_interest", {
      service_name: serviceName,
      action,
    });
  },

  // Social Media
  socialClick: (platform: string, action: "click" | "share") => {
    trackEvent("social_interaction", {
      platform,
      action,
    });
  },

  socialMediaClick: (platform: string, location: string) => {
    trackEvent("social_interaction", {
      platform,
      action: "click",
      location,
    });
  },

  // Error Tracking
  error: (errorMessage: string, errorLocation: string) => {
    trackEvent("error", {
      error_message: errorMessage,
      error_location: errorLocation,
    });
  },
};
