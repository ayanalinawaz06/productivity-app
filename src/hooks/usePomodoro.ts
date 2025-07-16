import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_FOCUS_DURATION = 25 * 60;
const DEFAULT_BREAK_DURATION = 5 * 60;

export function usePomodoro() {
    const [focusDuration, setFocusDuration] = useState(DEFAULT_FOCUS_DURATION);
    const [breakDuration, setBreakDuration] = useState(DEFAULT_BREAK_DURATION);
    const [timeLeft, setTimeLeft] = useState(focusDuration);
    const [isRunning, setIsRunning] = useState(false);
    const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
    const intervalRef = useRef<number | null>(null);

    const today = new Date().toISOString().slice(0, 10);
    const [pomodoroStats, setPomodoroStats] = useLocalStorage<{ date: string; cycles: number }>('pomodoroStats', { date: today, cycles: 0 });

    useEffect(() => {
        if (pomodoroStats.date !== today) {
            setPomodoroStats({ date: today, cycles: 0 });
        }
    }, [today, pomodoroStats.date, setPomodoroStats]);

    const playSound = useCallback(() => {
        const audio = new Audio('/assets/bell.mp3');
        audio.play().catch(e => console.error("Error playing sound:", e));
    }, []);

    const resetTimer = useCallback(() => {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setIsRunning(false);
        setTimerMode('focus');
        setTimeLeft(focusDuration);
    }, [focusDuration]);


    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            playSound();
            if (timerMode === 'focus') {
                setPomodoroStats((prevStats) => ({
                    ...prevStats,
                    cycles: prevStats.cycles + 1,
                }));
                setTimerMode('break');
                setTimeLeft(breakDuration);
            } else {
                setTimerMode('focus');
                setTimeLeft(focusDuration);
            }
            setIsRunning(false);
            clearInterval(intervalRef.current!);
            intervalRef.current = null;

            // Optional: Add a subtle animation trigger here (e.g., set a state that triggers a CSS class)
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, timeLeft, timerMode, focusDuration, breakDuration, playSound, setPomodoroStats]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const toggleTimer = () => {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    };

    const skipSegment = () => {
        playSound();
        if (timerMode === 'focus') {
            setPomodoroStats((prevStats) => ({
                ...prevStats,
                cycles: prevStats.cycles + 1,
            }));
            setTimerMode('break');
            setTimeLeft(breakDuration);
        } else {
            setTimerMode('focus');
            setTimeLeft(focusDuration);
        }
        setIsRunning(false);
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return {
        timeLeft: formatTime(timeLeft),
        rawTimeLeft: timeLeft,
        isRunning,
        timerMode,
        startTimer,
        pauseTimer,
        resetTimer,
        toggleTimer,
        skipSegment,
        completedCyclesToday: pomodoroStats.cycles,
        setFocusDuration,
        setBreakDuration,
        focusDuration,
        breakDuration,
        DEFAULT_FOCUS_DURATION,
        DEFAULT_BREAK_DURATION,
    };
}