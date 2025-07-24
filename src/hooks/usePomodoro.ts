// src/hooks/usePomodoro.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import toast from 'react-hot-toast'; // Import toast

// Define the default durations
const DEFAULT_FOCUS_DURATION = 25 * 60; // 25 minutes in seconds
const DEFAULT_BREAK_DURATION = 5 * 60;  // 5 minutes in seconds

export function usePomodoro() {
    const [focusDuration, setFocusDuration] = useState(DEFAULT_FOCUS_DURATION);
    const [breakDuration, setBreakDuration] = useState(DEFAULT_BREAK_DURATION);
    const [timeLeft, setTimeLeft] = useState(focusDuration);
    const [isRunning, setIsRunning] = useState(false);
    const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus'); // 'focus' or 'break'
    const intervalRef = useRef<number | null>(null);

    // Persist today's completed cycles
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const [pomodoroStats, setPomodoroStats] = useLocalStorage<{ date: string; cycles: number }>('pomodoroStats', { date: today, cycles: 0 });

    // Reset cycles if the day changes
    useEffect(() => {
        if (pomodoroStats.date !== today) {
            setPomodoroStats({ date: today, cycles: 0 });
        }
    }, [today, pomodoroStats.date, setPomodoroStats]);

    const playSound = useCallback(() => {
        // You'll need to add a sound file in your public/assets folder, e.g., 'bell.mp3'
        const audio = new Audio('/assets/bell.mp3'); // Assuming you put a sound file here
        audio.play().catch(e => console.error("Error playing sound:", e));
    }, []);

    const resetTimer = useCallback(() => {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setIsRunning(false);
        setTimerMode('focus');
        setTimeLeft(focusDuration); // Reset to current focus duration
    }, [focusDuration]);


    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Timer finished
            playSound();
            if (timerMode === 'focus') {
                setPomodoroStats((prevStats) => ({
                    ...prevStats,
                    cycles: prevStats.cycles + 1,
                }));
                setTimerMode('break');
                setTimeLeft(breakDuration);
                // ADDED TOAST MESSAGE FOR FOCUS SESSION COMPLETE
                toast.success(`Focus session complete! Take a ${breakDuration / 60}-minute break. 🎉`);
            } else {
                setTimerMode('focus');
                setTimeLeft(focusDuration);
                // ADDED TOAST MESSAGE FOR BREAK SESSION COMPLETE
                toast(`Break session complete! Time to focus for ${focusDuration / 60} minutes.`);
            }
            setIsRunning(false); // Pause after each segment, user can manually start next
            clearInterval(intervalRef.current!);
            intervalRef.current = null;

            // Optional: Add a subtle animation trigger here (e.g., set a state that triggers a CSS class)
        }

        // Cleanup function for useEffect
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
            // ADDED TOAST MESSAGE FOR SKIPPING FOCUS SESSION
            toast.success(`Focus session skipped! Taking a ${breakDuration / 60}-minute break. 🎉`);
        } else {
            setTimerMode('focus');
            setTimeLeft(focusDuration);
            // ADDED TOAST MESSAGE FOR SKIPPING BREAK SESSION
            toast(`Break session skipped! Time to focus for ${focusDuration / 60} minutes.`);
        }
        setIsRunning(false);
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
    };

    // Format time for display
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return {
        timeLeft: formatTime(timeLeft),
        rawTimeLeft: timeLeft, // Provide raw time for progress bar calculations if needed
        isRunning,
        timerMode,
        startTimer,
        pauseTimer,
        resetTimer,
        toggleTimer,
        skipSegment,
        completedCyclesToday: pomodoroStats.cycles,
        setFocusDuration, // For optional custom durations
        setBreakDuration, // For optional custom durations
        focusDuration,
        breakDuration,
        DEFAULT_FOCUS_DURATION,
        DEFAULT_BREAK_DURATION,
    };
}
