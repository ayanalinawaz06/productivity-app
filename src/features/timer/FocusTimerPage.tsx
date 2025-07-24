// src/features/timer/FocusTimerPage.tsx
import React, { useState } from 'react';
import { usePomodoro } from '../../hooks/usePomodoro';
import toast from 'react-hot-toast'; // Import toast

const FocusTimerPage: React.FC = () => {
    const {
        timeLeft,
        rawTimeLeft,
        isRunning,
        timerMode,
        startTimer,
        pauseTimer,
        resetTimer,
        toggleTimer,
        skipSegment,
        completedCyclesToday,
        setFocusDuration,
        setBreakDuration,
        focusDuration,
        breakDuration,
        DEFAULT_FOCUS_DURATION,
        DEFAULT_BREAK_DURATION,
    } = usePomodoro();

    // State for showing custom duration inputs
    const [showCustomDurations, setShowCustomDurations] = useState(false);
    const [customFocusInput, setCustomFocusInput] = useState(String(focusDuration / 60));
    const [customBreakInput, setCustomBreakInput] = useState(String(breakDuration / 60));

    // Handle setting custom durations
    const handleSetCustomDurations = () => {
        const newFocus = parseInt(customFocusInput) * 60;
        const newBreak = parseInt(customBreakInput) * 60;

        if (!isNaN(newFocus) && newFocus > 0) {
            setFocusDuration(newFocus);
        }
        if (!isNaN(newBreak) && newBreak > 0) {
            setBreakDuration(newBreak);
        }
        resetTimer();
        setShowCustomDurations(false);
        toast.success('Timer durations updated!'); // Added toast
    };

    // Original playSound function, updated to include toast based on timer mode
    // (This part is handled internally by usePomodoro, so we'll adjust usePomodoro)
    // For timer completion toast, it's better to add inside usePomodoro where playSound is called
    // or return a flag from usePomodoro for toast on completion.
    // Let's modify usePomodoro slightly for a more integrated toast experience here.

    // Re-check usePomodoro, specifically where `playSound()` is called.
    // We want a toast to appear there.

    // *******************************************************************
    // IMPORTANT: Make this change in src/hooks/usePomodoro.ts as well
    // Import toast: `import toast from 'react-hot-toast';`
    // Add toast messages inside the `useEffect` where `timeLeft === 0`
    // *******************************************************************
    /*
    // src/hooks/usePomodoro.ts (Relevant section after importing toast)
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            // ... timer logic ...
        } else if (timeLeft === 0) {
            playSound();
            if (timerMode === 'focus') {
                setPomodoroStats((prevStats) => ({
                    ...prevStats,
                    cycles: prevStats.cycles + 1,
                }));
                setTimerMode('break');
                setTimeLeft(breakDuration);
                toast.success(`Focus session complete! Take a ${breakDuration / 60}-minute break. 🎉`); // ADD THIS LINE
            } else {
                setTimerMode('focus');
                setTimeLeft(focusDuration);
                toast.info(`Break session complete! Time to focus for ${focusDuration / 60} minutes.`); // ADD THIS LINE
            }
            setIsRunning(false);
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
        }
        // ... cleanup ...
    }, [isRunning, timeLeft, timerMode, focusDuration, breakDuration, playSound, setPomodoroStats]);
    */
    // *******************************************************************

    // Calculate progress percentage for visual feedback
    const maxDuration = timerMode === 'focus' ? focusDuration : breakDuration;
    const progressPercentage = maxDuration > 0 ? (rawTimeLeft / maxDuration) * 100 : 0;

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700 dark:text-indigo-400">Pomodoro Focus Timer</h1>

            {/* Timer Display */}
            <div
                className={`relative w-64 h-64 rounded-full flex items-center justify-center text-5xl font-bold transition-all duration-300
                    ${timerMode === 'focus' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}
                    ${isRunning && rawTimeLeft < 10 && timerMode === 'focus' ? 'animate-pulse-warning' : ''}
                `}
                style={{
                    background: `conic-gradient(${timerMode === 'focus' ? '#4A0D0D' : '#0F4C2C'} ${100 - progressPercentage}%, ${timerMode === 'focus' ? '#EF4444' : '#22C55E'} ${100 - progressPercentage}%)`
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="z-10">{timeLeft}</span>
                </div>
            </div>


            <p className="mt-4 text-2xl font-medium text-gray-800 dark:text-white">
                {timerMode === 'focus' ? 'Focus Time!' : 'Break Time!'}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
                Completed cycles today: {completedCyclesToday}
            </p>

            {/* Control Buttons */}
            <div className="mt-8 flex space-x-4">
                <button
                    onClick={toggleTimer}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-transform transform hover:scale-105"
                >
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button
                    onClick={resetTimer}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-transform transform hover:scale-105"
                >
                    Reset
                </button>
                <button
                    onClick={skipSegment}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-transform transform hover:scale-105"
                >
                    Skip
                </button>
            </div>

            {/* Custom Duration Toggle */}
            <button
                onClick={() => setShowCustomDurations(!showCustomDurations)}
                className="mt-8 text-blue-600 dark:text-blue-400 hover:underline"
            >
                {showCustomDurations ? 'Hide Custom Durations' : 'Set Custom Durations'}
            </button>

            {/* Custom Duration Inputs */}
            {showCustomDurations && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                        <label htmlFor="focusDuration" className="text-gray-700 dark:text-gray-200">Focus (minutes):</label>
                        <input
                            id="focusDuration"
                            type="number"
                            min="1"
                            value={customFocusInput}
                            onChange={(e) => setCustomFocusInput(e.target.value)}
                            className="w-24 px-3 py-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <label htmlFor="breakDuration" className="text-gray-700 dark:text-gray-200">Break (minutes):</label>
                        <input
                            id="breakDuration"
                            type="number"
                            min="1"
                            value={customBreakInput}
                            onChange={(e) => setCustomBreakInput(e.target.value)}
                            className="w-24 px-3 py-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                    </div>
                    <button
                        onClick={handleSetCustomDurations}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                        Apply Durations
                    </button>
                    <button
                        onClick={() => {
                            setFocusDuration(DEFAULT_FOCUS_DURATION);
                            setBreakDuration(DEFAULT_BREAK_DURATION);
                            resetTimer();
                            setShowCustomDurations(false);
                            setCustomFocusInput(String(DEFAULT_FOCUS_DURATION / 60));
                            setCustomBreakInput(String(DEFAULT_BREAK_DURATION / 60));
                        }}
                        className="px-4 py-2 bg-gray-400 text-gray-800 rounded-md hover:bg-gray-500 transition"
                    >
                        Reset to Defaults
                    </button>
                </div>
            )}
        </div>
    );
};

export default FocusTimerPage;