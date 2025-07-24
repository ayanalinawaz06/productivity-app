import { useLocalStorage } from '../../hooks/useLocalStorage'; //
import type { Habit } from './types';

export function useHabits() {
    const [habits, setHabits] = useLocalStorage<Habit[]>('habits', []); //

    const generateId = () => Math.random().toString(36).substring(2, 11);

    const addHabit = (newHabitData: Omit<Habit, 'id' | 'completionDates'>) => {
        const habitWithId: Habit = {
            ...newHabitData,
            id: generateId(),
            completionDates: [],
        };
        setHabits((prevHabits) => [...prevHabits, habitWithId]);
    };

    const updateHabit = (updatedHabit: Habit) => {
        setHabits((prevHabits) =>
            prevHabits.map((habit) => (habit.id === updatedHabit.id ? updatedHabit : habit))
        );
    };

    const deleteHabit = (id: string) => {
        setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
    };

    const toggleHabitCompletion = (habitId: string, date: string) => {
        setHabits((prevHabits) =>
            prevHabits.map((habit) => {
                if (habit.id === habitId) {
                    const existingIndex = habit.completionDates.indexOf(date);
                    if (existingIndex > -1) {
                        const updatedCompletionDates = [...habit.completionDates];
                        updatedCompletionDates.splice(existingIndex, 1);
                        return { ...habit, completionDates: updatedCompletionDates };
                    } else {
                        return { ...habit, completionDates: [...habit.completionDates, date].sort() };
                    }
                }
                return habit;
            })
        );
    };

    const calculateStreak = (completionDates: string[], frequency: Habit['frequency']): number => {
        if (completionDates.length === 0) return 0;

        const sortedDates = [...completionDates].sort();

        let streak = 0;
        let currentDate = new Date();

        const getFormattedDate = (d: Date) => d.toISOString().slice(0, 10);

        if (sortedDates.includes(getFormattedDate(currentDate))) {
            streak = 1;
        } else {
            const yesterday = new Date(currentDate);
            yesterday.setDate(currentDate.getDate() - 1);
            if (!sortedDates.includes(getFormattedDate(yesterday))) {
                return 0;
            }
        }

        let dayToCheck = new Date(currentDate);
        if (streak === 1) {
             dayToCheck.setDate(currentDate.getDate() - 1);
        } else {
             dayToCheck.setDate(currentDate.getDate() - 1);
        }


        while (true) {
            const formattedDay = getFormattedDate(dayToCheck);
            if (sortedDates.includes(formattedDay)) {
                streak++;
                dayToCheck.setDate(dayToCheck.getDate() - 1);
            } else {
                if (frequency === 'Daily') {
                    break;
                }
                break;
            }
        }
        return streak;
    };


    // Return value of the hook
    return {
        habits,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleHabitCompletion,
        calculateStreak, // Expose for use in HabitList
    };
}