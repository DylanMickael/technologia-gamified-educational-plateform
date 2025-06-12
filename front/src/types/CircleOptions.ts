export interface CircleOptions {
    colors?: string[];
    minSize?: number;
    maxSize?: number;
    zIndex?: string;
    circleNumber?: number;
}

export const defaultOptions: Required<Omit<CircleOptions, 'circleNumber'>> = {
    colors: ["green", "lightgreen", "orange", "purple", "blue"],
    minSize: 15,
    maxSize: 20,
    zIndex: "-1",
};