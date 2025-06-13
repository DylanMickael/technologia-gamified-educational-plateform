import type { ReactNode, CSSProperties } from "react";
import type { Variants } from "framer-motion";

export interface ComponentProps {
    variants: Variants | undefined;
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}