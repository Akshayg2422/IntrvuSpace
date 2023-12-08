import { useState, useEffect } from "react";

const useKeyPress = (targetKey: any) => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        const downHandler = ({ key }) => key === targetKey && setKeyPressed(true);
        const upHandler = ({ key }) => key === targetKey && setKeyPressed(false);

        document.addEventListener("keydown", downHandler);
        document.addEventListener("keyup", upHandler);

        return () => {
            document.removeEventListener("keydown", downHandler);
            document.removeEventListener("keyup", upHandler);
        };
    }, [targetKey]);

    return keyPressed;
};

export { useKeyPress }