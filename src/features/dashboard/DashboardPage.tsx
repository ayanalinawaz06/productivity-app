import React from 'react';
import { Link } from 'react-router-dom';

import { useTasks } from '../tasks/useTasks';
import { useNotes } from '../notes/useNotes';
import { usePomodoro } from '../../hooks/usePomodoro';
import { useHabits } from '../habits/useHabits';

const DashboardPage: React.FC = () => {
    const { tasks } = useTasks();
    const { notes } = useNotes();
    const { completedCyclesToday } = usePomodoro();
    const { habits } = useHabits();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayFormatted = today.toISOString().slice(0, 10);

    const tasksDueToday = tasks.filter(
        (task) => task.dueDate === todayFormatted && task.status === 'Pending'
    ).length;

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const completedTasksThisWeek = tasks.filter(
        (task) =>
            task.status === 'Completed' && new Date(task.dueDate).getTime() >= startOfWeek.getTime()
    ).length;


    const habitsMarkedToday = habits.filter(habit =>
        habit.completionDates.includes(todayFormatted)
    ).length;

    const dashboardCards = [
        {
            title: 'Tasks Due Today',
            value: tasksDueToday ?? 0,
            unit: 'tasks',
            link: '/tasks',
            bgColor: 'bg-blue-DEFAULT',
            hoverBgColor: 'hover:bg-blue-dark',
            icon: '🧾'
        },
        {
            title: 'Tasks Completed This Week',
            value: completedTasksThisWeek ?? 0,
            unit: 'tasks',
            link: '/tasks',
            bgColor: 'bg-blue-DEFAULT',
            hoverBgColor: 'hover:bg-blue-dark',
            icon: '✅'
        },
        {
            title: 'Focus Sessions Today',
            value: completedCyclesToday ?? 0,
            unit: 'cycles',
            link: '/focus-timer',
            bgColor: 'bg-indigo-DEFAULT',
            hoverBgColor: 'hover:bg-indigo-dark',
            icon: '⏱️'
        },
        {
            title: 'Habits Marked Today',
            value: habitsMarkedToday ?? 0,
            unit: 'habits',
            link: '/habits',
            bgColor: 'bg-green-DEFAULT',
            hoverBgColor: 'hover:bg-green-dark',
            icon: '📅'
        },
        {
            title: 'Total Notes',
            value: notes.length ?? 0,
            unit: 'notes',
            link: '/notes',
            bgColor: 'bg-purple-DEFAULT',
            hoverBgColor: 'hover:bg-purple-dark',
            icon: '📝'
        },
    ];

    return (
        <div className="p-4 sm:p-8 min-h-[calc(100vh-64px)]">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary-darker-light dark:text-primary-lighter-dark">Your Productivity Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
                {dashboardCards.map((card) => (
                    <Link
                        key={card.title}
                        to={card.link}
                        className={`${card.bgColor} ${card.hoverBgColor} text-white p-6 md:p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-center
                                     hover:scale-[1.02] transition-all duration-200 ease-in-out cursor-pointer
                                     border border-transparent hover:border-white dark:hover:border-gray-300`}
                    >
                        <div className="text-5xl md:text-6xl mb-4">{card.icon}</div>
                        <h2 className="text-xl md:text-2xl font-semibold mb-2">{card.title}</h2>
                        <p className="text-4xl md:text-5xl font-bold">{card.value}</p>
                        <p className="text-sm opacity-80">{card.unit}</p>
                    </Link>
                ))}
            </div>

            <div className="max-w-6xl mx-auto mt-16 text-center">
                <h2 className="text-2xl font-bold mb-8 text-text-light dark:text-text-dark">Quick Actions</h2>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                    <Link
                        to="/tasks"
                        className="px-6 py-3 sm:px-8 sm:py-4 bg-primary-light text-white rounded-lg shadow-md
                                   hover:bg-primary-darker-light dark:bg-primary-dark dark:hover:bg-primary-lighter-dark
                                   transition-all duration-200 ease-in-out transform hover:scale-105
                                   border border-transparent hover:border-primary-darker-light dark:hover:border-primary-lighter-dark
                                   text-base sm:text-lg font-semibold w-full sm:w-auto"
                    >
                        Go to Tasks
                    </Link>
                    <Link
                        to="/notes"
                        className="px-6 py-3 sm:px-8 sm:py-4 bg-primary-light text-white rounded-lg shadow-md
                                   hover:bg-primary-darker-light dark:bg-primary-dark dark:hover:bg-primary-lighter-dark
                                   transition-all duration-200 ease-in-out transform hover:scale-105
                                   border border-transparent hover:border-primary-darker-light dark:hover:border-primary-lighter-dark
                                   text-base sm:text-lg font-semibold w-full sm:w-auto"
                    >
                        Go to Notes
                    </Link>
                    <Link
                        to="/focus-timer"
                        className="px-6 py-3 sm:px-8 sm:py-4 bg-primary-light text-white rounded-lg shadow-md
                                   hover:bg-primary-darker-light dark:bg-primary-dark dark:hover:bg-primary-lighter-dark
                                   transition-all duration-200 ease-in-out transform hover:scale-105
                                   border border-transparent hover:border-primary-darker-light dark:hover:border-primary-lighter-dark
                                   text-base sm:text-lg font-semibold w-full sm:w-auto"
                    >
                        Go to Timer
                    </Link>
                    <Link
                        to="/habits"
                        className="px-6 py-3 sm:px-8 sm:py-4 bg-primary-light text-white rounded-lg shadow-md
                                   hover:bg-primary-darker-light dark:bg-primary-dark dark:hover:bg-primary-lighter-dark
                                   transition-all duration-200 ease-in-out transform hover:scale-105
                                   border border-transparent hover:border-primary-darker-light dark:hover:border-primary-lighter-dark
                                   text-base sm:text-lg font-semibold w-full sm:w-auto"
                    >
                        Go to Habits
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;