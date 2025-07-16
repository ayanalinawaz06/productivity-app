import React, { useState } from 'react';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import { useTasks } from './useTasks';
import type { Task } from './types';

const TasksPage: React.FC = () => {
    const { tasks, addTask, updateTask, deleteTask, markTaskComplete, filter, setFilter, sort, setSort } = useTasks();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

    const handleAddTask = (newTaskData: Omit<Task, 'id' | 'status'>) => {
        addTask(newTaskData);
        setIsFormVisible(false);
    };

    const handleEditTask = (task: Task) => {
        setTaskToEdit(task);
        setIsFormVisible(true);
    };

    const handleUpdateTask = (updatedData: Omit<Task, 'id' | 'status'>) => {
        if (taskToEdit) {
            updateTask({ ...taskToEdit, ...updatedData });
            setTaskToEdit(undefined);
            setIsFormVisible(false);
        }
    };

    const handleCancelForm = () => {
        setIsFormVisible(false);
        setTaskToEdit(undefined);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value as 'All' | 'Today' | 'Completed');
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value as 'dueDate' | 'priority');
    };

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700 dark:text-blue-400">Task Manager</h1>

            <div className="max-w-3xl mx-auto mb-8">
                <button
                    onClick={() => {
                        setIsFormVisible(!isFormVisible);
                        setTaskToEdit(undefined);
                    }}
                    className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-transform transform hover:scale-105"
                >
                    {isFormVisible ? 'Hide Form' : 'Add New Task'}
                </button>

                {isFormVisible && (
                    <div className="mt-6">
                        <TaskForm
                            onSubmit={taskToEdit ? handleUpdateTask : handleAddTask}
                            initialData={taskToEdit}
                            onCancel={handleCancelForm}
                        />
                    </div>
                )}
            </div>

            <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <div>
                    <label htmlFor="filter" className="sr-only">Filter Tasks</label>
                    <select
                        id="filter"
                        value={filter}
                        onChange={handleFilterChange}
                        className="py-2 px-3 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                    >
                        <option value="All">All Tasks</option>
                        <option value="Today">Due Today</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort" className="sr-only">Sort Tasks</label>
                    <select
                        id="sort"
                        value={sort}
                        onChange={handleSortChange}
                        className="py-2 px-3 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                    >
                        <option value="dueDate">Sort by Due Date</option>
                        <option value="priority">Sort by Priority</option>
                    </select>
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Your Tasks</h2>
                <TaskList
                    tasks={tasks}
                    onToggleComplete={markTaskComplete}
                    onEdit={handleEditTask}
                    onDelete={deleteTask}
                />
            </div>
        </div>
    );
};

export default TasksPage;