// src/features/habits/HabitsPage.tsx
import React, { useState } from 'react';
import HabitForm from '../../components/HabitForm';
import HabitGrid from '../../components/HabitGrid';
import { useHabits } from './useHabits';
import type { Habit } from './types';
import toast from 'react-hot-toast';

const HabitsPage: React.FC = () => {
    const { habits, addHabit, updateHabit, deleteHabit, toggleHabitCompletion, calculateStreak } = useHabits();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [habitToEdit, setHabitToEdit] = useState<Habit | undefined>(undefined);

    const handleAddHabit = (newHabitData: Omit<Habit, 'id' | 'completionDates'>) => {
        addHabit(newHabitData);
        setIsFormVisible(false);
        toast.success('Habit added successfully!'); // Added toast
    };

    const handleEditHabit = (habit: Habit) => {
        setHabitToEdit(habit);
        setIsFormVisible(true);
    };

    const handleUpdateHabit = (updatedData: Omit<Habit, 'id' | 'completionDates'>) => {
        if (habitToEdit) {
            updateHabit({ ...habitToEdit, ...updatedData });
            setHabitToEdit(undefined);
            setIsFormVisible(false);
            toast.success('Habit updated successfully!'); // Added toast
        }
    };

    const handleCancelForm = () => {
        setIsFormVisible(false);
        setHabitToEdit(undefined);
    };

    const handleDeleteHabit = (id: string) => {
        deleteHabit(id);
        toast.error('Habit deleted!'); // Added toast
    };

    const handleToggleHabitCompletion = (habitId: string, date: string) => {
        toggleHabitCompletion(habitId, date);
        const habit = habits.find(h => h.id === habitId);
        if (habit && !habit.completionDates.includes(date)) { // If it was just marked complete
            toast.success(`Habit "${habit.title}" marked complete for today!`); // Added toast
        } else {
            toast(`Habit "${habit?.title}" unmarked for today.`); // Added toast
        }
    };

    // Get today's date in YYYY-MM-DD format for use with toggleHabitCompletion
    const getTodayFormattedDate = () => {
        return new Date().toISOString().slice(0, 10);
    };

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-green-700 dark:text-green-400">Habit Tracker</h1>

            <div className="max-w-4xl mx-auto mb-8">
                <button
                    onClick={() => {
                        setIsFormVisible(!isFormVisible);
                        setHabitToEdit(undefined);
                    }}
                    className="w-full py-3 px-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-transform transform hover:scale-105"
                >
                    {isFormVisible ? 'Hide Form' : 'Add New Habit'}
                </button>

                {isFormVisible && (
                    <div className="mt-6">
                        <HabitForm
                            onSubmit={habitToEdit ? handleUpdateHabit : handleAddHabit}
                            initialData={habitToEdit}
                            onCancel={handleCancelForm}
                        />
                    </div>
                )}
            </div>

            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Your Habits</h2>
                <HabitGrid
                    habits={habits}
                    onToggleCompletion={handleToggleHabitCompletion} // Use local handler for toast
                    onEdit={handleEditHabit}
                    onDelete={handleDeleteHabit} // Use local handler for toast
                    calculateStreak={calculateStreak}
                />
            </div>
        </div>
    );
};

export default HabitsPage;