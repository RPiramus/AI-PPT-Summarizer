import { useState, useEffect } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 
                   (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light');
        }
        return 'light';
    });

    useEffect(() => {
        const element = document.documentElement;
        const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = () => {
            if (theme === 'dark' || (!localStorage.getItem('theme') && darkQuery.matches)) {
                element.classList.add('dark');
            } else {
                element.classList.remove('dark');
            }
        };

        applyTheme();

        const handleSystemChange = (e) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        darkQuery.addEventListener('change', handleSystemChange);
        return () => darkQuery.removeEventListener('change', handleSystemChange);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return [theme, toggleTheme];
};

export default useTheme;