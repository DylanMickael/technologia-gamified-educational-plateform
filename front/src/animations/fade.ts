export const fadeInContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1, 
      ease: "easeOut",
      staggerChildren: 0,
    },
  },
} as const;

export const fadeInItem = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 1.2, 
      ease: "easeOut" 
    },
  },
} as const;

export const fadeDownContainer = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 1.2, 
      ease: "easeOut"
    },
  },
} as const;

export const fadeLeftItem = {
  hidden: { x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: 1.2, 
      ease: "easeOut" 
    },
  },
} as const;