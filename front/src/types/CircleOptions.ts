export interface CircleOptions {
    colors?: string[];
    minSize?: number;
    maxSize?: number;
    zIndex?: string;
    circleNumber?: number;
}

export const defaultOptions: Required<Omit<CircleOptions, 'circleNumber'>> = {
    colors: ["green", "orange", "purple", "blue"],
    minSize: 15,
    maxSize: 30,
    zIndex: "-1",
};