import { useState, useEffect } from 'react';

function getStoredValue<T>(key: string, defaultValue: T): T {
    try {
        const saved = localStorage.getItem(key);
        if (saved) {
            return JSON.parse(saved) as T;
        }
    } catch (error) {
        console.error("Error parsing localStorage key:", key, error);
    }
    return defaultValue;
}

export function useLocalStorage<T>(key: string, defaultValue: T) {
    const [value, setValue] = useState<T>(() => {
        return getStoredValue(key, defaultValue);
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error setting localStorage key:", key, error);
        }
    }, [key, value]);

    return [value, setValue] as const;
}