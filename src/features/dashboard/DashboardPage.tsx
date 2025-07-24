// src/features/dashboard/DashboardPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// Import hooks from other modules to get their data
import { useTasks } from '../tasks/useTasks';
import { useNotes } from '../notes/useNotes';
import { usePomodoro } from '../../hooks/usePomodoro';
import { useHabits } from '../habits/useHabits';

const DashboardPage: React.FC = () => {
    // Fetch data from all modules
    const { tasks } = useTasks();
    const { notes } = useNotes();
    const { completedCyclesToday } = usePomodoro();
    const { habits } = useHabits();

    // --- Calculate Dashboard Statistics ---
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const todayFormatted = today.toISOString().slice(0, 10); // YYYY-MM-DD

    // 1. Number of tasks due today
    const tasksDueToday = tasks.filter(
        (task) => task.dueDate === todayFormatted && task.status === 'Pending'
    ).length;

    // 2. Number of completed tasks this week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Go back to Sunday (or Monday if you adjust getDay())
    startOfWeek.setHours(0, 0, 0, 0);

    const completedTasksThisWeek = tasks.filter(
        (task) =>
            task.status === 'Completed' && new Date(task.dueDate).getTime() >= startOfWeek.getTime()
    ).length;

    // 3. Number of focus sessions completed today (directly from usePomodoro)
    //    completedCyclesToday is already handled by usePomodoro for daily reset.

    // 4. Number of habits marked today
    const habitsMarkedToday = habits.filter(habit =>
        habit.completionDates.includes(todayFormatted)
    ).length;

    // --- Dashboard Card Data ---
    const dashboardCards = [
        {
            title: 'Tasks Due Today',
            value: tasksDueToday,
            unit: 'tasks',
            link: '/tasks',
            bgColor: 'bg-blue-500', // Using Tailwind's default shades for specific modules
            icon: '🧾'
        },
        {
            title: 'Tasks Completed This Week',
            value: completedTasksThisWeek,
            unit: 'tasks',
            link: '/tasks',
            bgColor: 'bg-teal-500',
            icon: '✅'
        },
        {
            title: 'Focus Sessions Today',
            value: completedCyclesToday,
            unit: 'cycles',
            link: '/focus-timer',
            bgColor: 'bg-indigo-500',
            icon: '⏱️'
        },
        {
            title: 'Habits Marked Today',
            value: habitsMarkedToday,
            unit: 'habits',
            link: '/habits',
            bgColor: 'bg-green-500',
            icon: '📅'
        },
        {
            title: 'Total Notes',
            value: notes.length,
            unit: 'notes',
            link: '/notes',
            bgColor: 'bg-purple-500',
            icon: '📝'
        },
    ];

    return (
        <div className="p-8 bg-app-light dark:bg-app-dark min-h-screen font-roboto text-text-light dark:text-text-dark transition-colors duration-200">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary-darker-light dark:text-primary-lighter-dark">Your Productivity Dashboard</h1>

            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {dashboardCards.map((card) => (
                    <Link
                        key={card.title}
                        to={card.link}
                        // Dynamic background, text, shadow, rounded, padding, hover effects
                        className={`${card.bgColor} text-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col items-center justify-center text-center
                                     hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer
                                     border border-transparent hover:border-primary-light dark:hover:border-primary-dark`}
                    >
                        <div className="text-5xl md:text-6xl mb-4">{card.icon}</div>
                        <h2 className="text-xl md:text-2xl font-semibold mb-2">{card.title}</h2>
                        <p className="text-4xl md:text-5xl font-bold">{card.value}</p>
                        <p className="text-sm opacity-80">{card.unit}</p>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="max-w-6xl mx-auto mt-16 text-center">
                <h2 className="text-2xl font-bold mb-8 text-text-light dark:text-text-dark">Quick Actions</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    <Link
                        to="/tasks"
                        className="px-8 py-4 bg-primary-light text-white rounded-lg shadow-md hover:bg-primary-darker-light transition-all duration-200 ease-in-out transform hover:scale-105
                                   border border-transparent hover:border-primary-darker-light dark:hover:border-primary-lighter-dark"
                    >
                        Go to Tasks
                    </Link>
                    <Link
                        to="/notes"
                        className="px-8 py-4 bg-primary-light text-white rounded-lg shadow-md hover:bg-primary-darker-light transition-all duration-200 ease-in-out transform hover:scale-105
                                   border border-transparent hover:border-primary-darker-light dark:hover:border-primary-lighter-dark"
                    >
                        Go to Notes
                    </Link>
                    <Link
                        to="/focus-timer"
                        className="px-8 py-4 bg-primary-light text-white rounded-lg shadow-md hover:bg-primary-darker-light transition-all duration-200 ease-in-out transform hover:scale-105
                                   border border-transparent hover:border-primary-darker-light dark:hover:border-primary-lighter-dark"
                    >
                        Go to Timer
                    </Link>
                    <Link
                        to="/habits"
                        className="px-8 py-4 bg-primary-light text-white rounded-lg shadow-md hover:bg-primary-darker-light transition-all duration-200 ease-in-out transform hover:scale-105
                                   border border-transparent hover:border-primary-darker-light dark:hover:border-primary-lighter-dark"
                    >
                        Go to Habits
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
