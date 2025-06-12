import { useRef, useEffect } from "react";
import { addCircleIllusationToElement } from "../utils/CircleIllustration";
import type { CircleOptions } from "../types/CircleOptions";

export function useSectionCircles(circleNumber = 3, options: CircleOptions = {}) {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new ResizeObserver(() => {
            addCircleIllusationToElement(element, circleNumber, options);
        });

        observer.observe(element);
        addCircleIllusationToElement(element, circleNumber, options);

        return () => {
            observer.disconnect();
            const circles = element.querySelectorAll('[data-circle-illustration]');
            circles.forEach(circle => circle.remove());
        };
    }, [circleNumber, options]);

    return elementRef;
}

export default useSectionCircles;