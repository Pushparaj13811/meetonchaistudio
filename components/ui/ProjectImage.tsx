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
    <Image
      src={`${basePath}.webp`}
      alt={alt}
      width={800}
      height={600}
      quality={quality}
      className={className}
      sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 800px"
      placeholder="blur"
      blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}
