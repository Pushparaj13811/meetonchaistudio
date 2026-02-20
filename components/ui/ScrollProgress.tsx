"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "rgba(255, 255, 255, 0.05)",
        zIndex: 9999,
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: "linear-gradient(90deg, #e67e22 0%, #d35400 100%)",
          boxShadow: "0 0 10px rgba(230, 126, 34, 0.5)",
          width: `${scrollProgress}%`,
          transition: "width 0.1s ease-out",
        }}
      />
    </motion.div>
  );
}
