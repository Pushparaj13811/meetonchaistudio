"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * ProjectImage Component
 *
 * Responsive project images with network-aware quality adjustment
 * Loads appropriate size based on device and connection speed
 */
export function ProjectImage({ src, alt, className }: ProjectImageProps) {
  const [quality, setQuality] = useState(85);

  useEffect(() => {
    // Detect slow connections and reduce quality
    if ("connection" in navigator) {
      const conn = (navigator as any).connection;
      if (conn && (conn.effectiveType === "2g" || conn.effectiveType === "slow-2g")) {
        setQuality(60);
      }
    }
  }, []);

  // Extract base path without extension
  const basePath = src.replace(/\.[^/.]+$/, "");

  return (
    <picture>
      {/* WebP sources for different screen sizes */}
      <source
        media="(max-width: 640px)"
        srcSet={`${basePath}-small.webp`}
        type="image/webp"
      />
      <source
        media="(max-width: 1024px)"
        srcSet={`${basePath}-medium.webp`}
        type="image/webp"
      />
      <source
        srcSet={`${basePath}.webp`}
        type="image/webp"
      />

      {/* Fallback */}
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        quality={quality}
        className={className}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </picture>
  );
}
