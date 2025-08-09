import React, { useState } from 'react';
import { usePomodoro } from '../../hooks/usePomodoro';
import toast from 'react-hot-toast';

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

    const [showCustomDurations, setShowCustomDurations] = useState(false);
    const [customFocusInput, setCustomFocusInput] = useState(String(focusDuration / 60));
    const [customBreakInput, setCustomBreakInput] = useState(String(breakDuration / 60));

    const handleSetCustomDurations = () => {
        const newFocus = parseInt(customFocusInput) * 60;
        const newBreak = parseInt(customBreakInput) * 60;

        if (!isNaN(newFocus) && newFocus > 0) {
            setFocusDuration(newFocus);
        } else {
            toast.error('Focus duration must be a positive number.');
            return;
        }
        if (!isNaN(newBreak) && newBreak > 0) {
            setBreakDuration(newBreak);
        } else {
            toast.error('Break duration must be a positive number.');
            return;
        }
        
        resetTimer();
        setShowCustomDurations(false);
        toast.success('Timer durations updated!');
    };

    const maxDuration = timerMode === 'focus' ? focusDuration : breakDuration;
    const progressPercentage = maxDuration > 0 ? (rawTimeLeft / maxDuration) * 100 : 0;

    return (
        <div className="p-4 sm:p-6 min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gradient-to-br from-app-light to-gray-100 dark:from-app-dark dark:to-gray-900">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700 dark:text-indigo-400">Pomodoro Focus Timer</h1>

            <div
                className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center text-6xl md:text-7xl font-bold text-white shadow-xl transform transition-all duration-300 ease-in-out
                    ${timerMode === 'focus' ? 'bg-red-500' : 'bg-green-500'}
                    ${isRunning && rawTimeLeft < 10 && timerMode === 'focus' ? 'animate-pulse-warning' : ''}
                    ${!isRunning ? 'hover:scale-[1.01]' : ''}
                `}
                style={{
                    background: `conic-gradient(${timerMode === 'focus' ? 'var(--color-indigo-dark)' : 'var(--color-green-dark)'} ${100 - progressPercentage}%, ${timerMode === 'focus' ? 'var(--color-red-500)' : 'var(--color-green-500)'} ${100 - progressPercentage}%)`
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span>{timeLeft}</span>
                </div>
                <div className="absolute inset-4 sm:inset-6 rounded-full bg-gray-100 dark:bg-gray-800 opacity-20 z-0"></div>
            </div>


            <p className="mt-6 text-2xl font-medium text-gray-800 dark:text-white">
                {timerMode === 'focus' ? 'Focus Time!' : 'Break Time!'}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Completed cycles today: {completedCyclesToday}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
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

            <button
                onClick={() => setShowCustomDurations(!showCustomDurations)}
                className="mt-8 text-primary-light dark:text-primary-lighter-dark hover:underline transition-colors"
            >
                {showCustomDurations ? 'Hide Custom Durations' : 'Set Custom Durations'}
            </button>

            {showCustomDurations && (
                <div className="mt-6 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg flex flex-col space-y-4 border border-gray-200 dark:border-gray-600 max-w-sm w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <label htmlFor="focusDuration" className="text-gray-700 dark:text-gray-200 text-sm sm:w-1/2">Focus (minutes):</label>
                        <input
                            id="focusDuration"
                            type="number"
                            min="1"
                            value={customFocusInput}
                            onChange={(e) => setCustomFocusInput(e.target.value)}
                            className="w-full sm:w-1/2 px-3 py-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <label htmlFor="breakDuration" className="text-gray-700 dark:text-gray-200 text-sm sm:w-1/2">Break (minutes):</label>
                        <input
                            id="breakDuration"
                            type="number"
                            min="1"
                            value={customBreakInput}
                            onChange={(e) => setCustomBreakInput(e.target.value)}
                            className="w-full sm:w-1/2 px-3 py-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <button
                            onClick={handleSetCustomDurations}
                            className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md"
                        >
                            Apply
                        </button>
                        <button
                            onClick={() => {
                                setFocusDuration(DEFAULT_FOCUS_DURATION);
                                setBreakDuration(DEFAULT_BREAK_DURATION);
                                resetTimer();
                                setShowCustomDurations(false);
                                setCustomFocusInput(String(DEFAULT_FOCUS_DURATION / 60));
                                setCustomBreakInput(String(DEFAULT_BREAK_DURATION / 60));
                                toast('Durations reset to defaults.');
                            }}
                            className="px-5 py-2 bg-gray-400 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-500 dark:hover:bg-gray-500 transition-colors shadow-sm"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FocusTimerPage;