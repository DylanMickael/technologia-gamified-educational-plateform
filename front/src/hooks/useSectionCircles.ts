import { useRef, useEffect } from "react";

const addCircleIllusationToSection = (
    section: HTMLElement,
    circleNumber: number,
) => {
    const colors = ["green", "orange", "purple", "blue"];
    for (let i = 0; i < circleNumber; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
        const x = Math.floor(Math.random() * (section.offsetWidth - size));
        const y = Math.floor(Math.random() * (section.offsetHeight - size));
        const div = document.createElement("div");
        div.style.position = 'absolute';
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.style.zIndex = `${-1}`;
        div.style.borderRadius = '50%';
        div.style.backgroundColor = color;
        div.style.width = `${size}px`;
        div.style.height = `${size}px`;
        section.appendChild(div);
    }
}

export function useSectionCircles(circleNumber: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;
    if (sectionRef.current) {
      addCircleIllusationToSection(sectionRef.current, circleNumber);
    }
  }, [circleNumber]);

  return sectionRef;
}

export default useSectionCircles;