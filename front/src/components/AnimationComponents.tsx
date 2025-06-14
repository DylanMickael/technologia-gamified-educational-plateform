import { motion } from 'framer-motion';
import type { ComponentProps } from '../types/AnimationTypes.ts';

export const AnimatedDiv = ({ variants, children, className = "", style = {} }: ComponentProps) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 1 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}