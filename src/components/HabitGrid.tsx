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
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            dates.push(d.toISOString().slice(0, 10));
        }
        return dates;
    };

    const weekDates = getDatesForWeek();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDayName = (dateString: string) => {
        const date = new Date(dateString);
        return dayNames[date.getDay()];
    };

    if (habits.length === 0) {
        return <p className="text-gray-600 dark:text-gray-400 text-center py-8">No habits added yet. Create a new habit to start tracking!</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-700 shadow-md rounded-lg divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-600">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider sticky left-0 z-10 bg-gray-50 dark:bg-gray-600 rounded-tl-lg">
                            Habit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Streak
                        </th>
                        {weekDates.map((date) => (
                            <th key={date} className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                <div>{getDayName(date)}</div>
                                <div>{date.slice(5)}</div>
                            </th>
                        ))}
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-lg">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {habits.map((habit) => (
                        <tr key={habit.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-700">
                                {habit.title} ({habit.frequency})
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {calculateStreak(habit.completionDates, habit.frequency)} days
                            </td>
                            {weekDates.map((date) => {
                                const isCompleted = habit.completionDates.includes(date);
                                const isFutureDate = new Date(date).setHours(0,0,0,0) > new Date().setHours(0,0,0,0);
                                return (
                                    <td key={date} className="px-4 py-4 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => onToggleCompletion(habit.id, date)}
                                            disabled={isFutureDate}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold
                                                ${isCompleted
                                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'}
                                                ${isFutureDate ? 'opacity-50 cursor-not-allowed' : 'transition'}
                                            `}
                                        >
                                            {isCompleted ? '✓' : ''}
                                        </button>
                                    </td>
                                );
                            })}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => onEdit(habit)}
                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600 mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(habit.id)}
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
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