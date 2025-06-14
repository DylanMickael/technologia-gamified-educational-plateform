export const getRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min;
export const getRandomColor = () => `hsl(${Math.floor(getRandomNumber(0, 360))}, 70%, 70%)`;