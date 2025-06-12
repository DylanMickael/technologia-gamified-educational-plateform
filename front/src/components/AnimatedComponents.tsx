import type { ReactNode, CSSProperties } from "react";
import { motion } from 'framer-motion';
import type { Variants } from "framer-motion";

interface ComponentProps {
    variants: Variants | undefined;
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export const AnimatedContainer = ({ variants, children, className = "", style = {} }: ComponentProps) => {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    );
}

export const AnimatedItem = ({ variants, children, className = "", style = {} }: ComponentProps) => {
  return (
    <motion.div
        variants={variants}
        className={className}
        style={style}
    >
      {children}
    </motion.div>
  );
}