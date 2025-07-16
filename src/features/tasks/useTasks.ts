import { useState, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Task } from './types';

export function useTasks() {
    const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
    const [filter, setFilter] = useState<'All' | 'Today' | 'Completed'>('All');
    const [sort, setSort] = useState<'dueDate' | 'priority'>('dueDate');

    const generateId = () => Math.random().toString(36).substring(2, 9);

    const addTask = (newTask: Omit<Task, 'id' | 'status'>) => {
        const taskWithId: Task = {
            ...newTask,
            id: generateId(),
            status: 'Pending',
        };
        setTasks((prevTasks) => [...prevTasks, taskWithId]);
    };

    const updateTask = (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const markTaskComplete = (id: string, completed: boolean) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, status: completed ? 'Completed' : 'Pending' } : task
            )
        );
    };

    const filteredAndSortedTasks = useMemo(() => {
        let currentTasks = [...tasks];

        if (filter === 'Today') {
            const today = new Date().toISOString().slice(0, 10);
            currentTasks = currentTasks.filter(
                (task) => task.dueDate === today && task.status === 'Pending'
            );
        } else if (filter === 'Completed') {
            currentTasks = currentTasks.filter((task) => task.status === 'Completed');
        }

        if (sort === 'dueDate') {
            currentTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        } else if (sort === 'priority') {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            currentTasks.sort(
                (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
            );
        }

        return currentTasks;
    }, [tasks, filter, sort]);

    return {
        tasks: filteredAndSortedTasks,
        addTask,
        updateTask,
        deleteTask,
        markTaskComplete,
        filter,
        setFilter,
        sort,
        setSort,
    };
}