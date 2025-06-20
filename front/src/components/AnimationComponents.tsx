import { motion } from 'framer-motion';
import type { ComponentProps } from '../types/AnimationTypes.ts';
import { useScrollAnimation } from "../hooks/useScrollAnimation"

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


export const TwAnimatedDiv: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}