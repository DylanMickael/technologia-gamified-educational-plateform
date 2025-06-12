export const infiniteSlideAndZoomUp = {
    hidden: { 
        y: 60,
        scale: 0.8
    },
    visible: {
        y: -20,
        scale: 1.2,
        transition: {
            duration: 40,
            ease:  "easeOut",
            repeat: Infinity,
            repeatType: "reverse"
        }
    }
} as const;