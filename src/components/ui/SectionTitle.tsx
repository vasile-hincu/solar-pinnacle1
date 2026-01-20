import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionTitleProps {
  badge?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}

export const SectionTitle = ({
  badge,
  title,
  description,
  align = "center",
}: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-16`}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="premium-badge mb-6 inline-block"
        >
          {badge}
        </motion.span>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  );
};
