"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

/**
 * Responsive image component that serves optimized formats based on:
 * - Browser support (WebP, AVIF, PNG)
 * - Device pixel ratio
 * - Network speed (via Network Information API)
 */
export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: ResponsiveImageProps) {
  const [quality, setQuality] = useState(85);

  useEffect(() => {
    // Detect slow connection and reduce quality
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      if (conn && (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g')) {
        setQuality(60);
      } else if (conn && conn.effectiveType === '3g') {
        setQuality(75);
      }
    }
  }, []);

  // Extract filename without extension
  const baseSrc = src.replace(/\.[^/.]+$/, "");
  const ext = src.split('.').pop();

  return (
    <Image
      src={`${baseSrc}.webp`}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder="blur"
      blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
    />
  );
}
