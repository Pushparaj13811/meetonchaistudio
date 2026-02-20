/**
 * Loading Spinner Component
 *
 * Shows a spinning loader for async operations
 */

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  text?: string;
}

export function LoadingSpinner({
  size = 40,
  color = "var(--color-accent)",
  text,
}: LoadingSpinnerProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-2)",
      }}
    >
      <div
        className="spinner"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: `3px solid rgba(255, 255, 255, 0.1)`,
          borderTop: `3px solid ${color}`,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      {text && (
        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "0.9375rem",
          }}
        >
          {text}
        </p>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Inline Loading Spinner - For buttons and inline use
 */
export function InlineSpinner({ size = 20 }: { size?: number }) {
  return (
    <div
      className="inline-spinner"
      style={{
        display: "inline-block",
        width: `${size}px`,
        height: `${size}px`,
        border: `2px solid rgba(255, 255, 255, 0.3)`,
        borderTop: `2px solid white`,
        borderRadius: "50%",
        animation: "spin 0.6s linear infinite",
      }}
    >
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Full Page Loader - For page transitions
 */
export function PageLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 10, 12, 0.95)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <LoadingSpinner size={60} text={text} />
    </div>
  );
}
