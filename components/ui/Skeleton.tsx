/**
 * Skeleton Loading Components
 *
 * Provides visual feedback during content loading
 */

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export function Skeleton({
  width = "100%",
  height = "20px",
  borderRadius = "8px",
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        background: "rgba(255, 255, 255, 0.05)",
        animation: "skeleton-loading 1.5s ease-in-out infinite",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style jsx>{`
        @keyframes skeleton-loading {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .skeleton::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.08),
            transparent
          );
          animation: skeleton-shimmer 1.5s ease-in-out infinite;
        }

        @keyframes skeleton-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Card Skeleton - For loading project cards, testimonials, etc.
 */
export function CardSkeleton() {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "24px",
        padding: "var(--space-4)",
      }}
    >
      <Skeleton height="200px" borderRadius="16px" />
      <div style={{ marginTop: "var(--space-3)" }}>
        <Skeleton height="24px" width="70%" />
      </div>
      <div style={{ marginTop: "var(--space-2)" }}>
        <Skeleton height="16px" width="100%" />
        <div style={{ marginTop: "8px" }}>
          <Skeleton height="16px" width="90%" />
        </div>
      </div>
      <div
        style={{
          marginTop: "var(--space-3)",
          display: "flex",
          gap: "8px",
        }}
      >
        <Skeleton height="32px" width="80px" borderRadius="16px" />
        <Skeleton height="32px" width="80px" borderRadius="16px" />
      </div>
    </div>
  );
}

/**
 * Form Skeleton - For loading forms
 */
export function FormSkeleton() {
  return (
    <div style={{ width: "100%" }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ marginBottom: "var(--space-3)" }}>
          <Skeleton height="16px" width="120px" />
          <div style={{ marginTop: "8px" }}>
            <Skeleton height="48px" borderRadius="12px" />
          </div>
        </div>
      ))}
      <Skeleton height="48px" borderRadius="50px" width="150px" />
    </div>
  );
}

/**
 * Text Skeleton - For loading text content
 */
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{ marginBottom: "8px" }}>
          <Skeleton
            height="16px"
            width={i === lines - 1 ? "60%" : "100%"}
          />
        </div>
      ))}
    </div>
  );
}
