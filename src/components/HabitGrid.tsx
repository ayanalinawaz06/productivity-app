import React from 'react';
import type { Habit } from '../features/habits/types';

interface HabitGridProps {
    habits: Habit[];
    onToggleCompletion: (habitId: string, date: string) => void;
    onEdit: (habit: Habit) => void;
    onDelete: (id: string) => void;
    calculateStreak: (completionDates: string[], frequency: Habit['frequency']) => number;
}

const HabitGrid: React.FC<HabitGridProps> = ({
    habits,
    onToggleCompletion,
    onEdit,
    onDelete,
    calculateStreak,
}) => {
    const getDatesForWeek = () => {
        const dates = [];
        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of day

        // Get the last 7 days including today
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today); // Clone today's date
            d.setDate(today.getDate() - i);
            dates.push(d.toISOString().slice(0, 10)); // YYYY-MM-DD format
        }
        return dates;
    };

    const weekDates = getDatesForWeek();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDayName = (dateString: string) => {
        const date = new Date(dateString);
        return dayNames[date.getDay()];
    };

    const isToday = (dateString: string) => {
        const today = new Date();
        today.setHours(0,0,0,0);
        const checkDate = new Date(dateString);
        checkDate.setHours(0,0,0,0);
        return checkDate.getTime() === today.getTime();
    }

    if (habits.length === 0) {
        return <p className="text-gray-600 dark:text-gray-400 text-center py-8">No habits added yet. Create a new habit to start tracking!</p>;
    }

    return (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-20">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-800 rounded-tl-xl z-20">
                            Habit
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[60px] md:min-w-[80px]">
                            Streak
                        </th>
                        {weekDates.map((date) => (
                            <th key={date} className={`px-2 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[50px] md:min-w-[70px] ${isToday(date) ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200' : ''}`}>
                                <div>{getDayName(date)}</div>
                                <div>{date.slice(5)}</div> {/* MM-DD */}
                            </th>
                        ))}
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-xl sticky right-0 bg-gray-50 dark:bg-gray-800 z-20">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                    {habits.map((habit) => (
                        <tr key={habit.id}>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-700">
                                {habit.title} ({habit.frequency})
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {calculateStreak(habit.completionDates, habit.frequency)} days
                            </td>
                            {weekDates.map((date) => {
                                const isCompleted = habit.completionDates.includes(date);
                                const isFutureDate = new Date(date).setHours(0,0,0,0) > new Date().setHours(0,0,0,0);
                                return (
                                    <td key={date} className="px-2 py-4 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => onToggleCompletion(habit.id, date)}
                                            disabled={isFutureDate}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold
                                                ${isCompleted
                                                    ? 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500'
                                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'}
                                                ${isFutureDate ? 'opacity-50 cursor-not-allowed' : 'transition-colors duration-150'}
                                            `}
                                            title={isFutureDate ? 'Cannot mark future date' : (isCompleted ? 'Mark Incomplete' : 'Mark Complete')}
                                        >
                                            {isCompleted ? '✓' : ''}
                                        </button>
                                    </td>
                                );
                            })}
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium sticky right-0 bg-white dark:bg-gray-700">
                                <button
                                    onClick={() => onEdit(habit)}
                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 mr-2 sm:mr-4 transition-colors"
                                    title="Edit Habit"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(habit.id)}
                                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors"
                                    title="Delete Habit"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HabitGrid;