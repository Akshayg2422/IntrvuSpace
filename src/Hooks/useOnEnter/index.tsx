import { useEffect } from 'react';

const useOnEnter = (callback: () => void) => {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                callback();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [callback]);
};

export {useOnEnter};
