import type { CircleOptions } from "../types/CircleOptions";
import { defaultOptions } from "../types/CircleOptions";

export const createCircle = ({
    color,
    size,
    x,
    y,
    zIndex,
}: {
    color: string;
    size: number;
    x: number;
    y: number;
    zIndex: string;
}) => {
    const div = document.createElement("div");
    div.setAttribute('data-circle-illustration', 'true');
    div.classList.add('circle-illustration');
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.style.zIndex = zIndex;
    div.style.backgroundColor = color;
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    return div;
}

export const addCircleIllusationToElement = (
    element: HTMLElement,
    circleNumber: number,
    options: CircleOptions = {}
) => {
    const { colors, minSize, maxSize, zIndex } = { ...defaultOptions, ...options };
    const existingCircles = element.querySelectorAll('[data-circle-illustration]');
    existingCircles.forEach(circle => circle.remove());

    for (let i = 0; i < circleNumber; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        const x = Math.floor(Math.random() * (element.offsetWidth - size));
        const y = Math.floor(Math.random() * (element.offsetHeight - size));
        const div = createCircle({ color, size, x, y, zIndex });
        element.appendChild(div);
    }
}
