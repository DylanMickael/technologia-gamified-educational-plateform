import { useState } from "react";

const useVisibility = () => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }
    
    return {isVisible, setIsVisible, toggleVisibility};
}

export default useVisibility;