import React from 'react';
import type { Task } from '../features/tasks/types';

interface TaskListProps {
    tasks: Task[];
    onToggleComplete: (id: string, completed: boolean) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
    if (tasks.length === 0) {
        return <p className="text-gray-600 dark:text-gray-400 text-center py-8">No tasks found. Add a new task to get started!</p>;
    }

    const getPriorityColorClasses = (priority: Task['priority']) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300';
        }
    };

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={`
                        p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between transition-all duration-200 ease-in-out
                        ${task.status === 'Completed'
                            ? 'bg-gray-100 dark:bg-gray-800 line-through text-gray-500 dark:text-gray-400 opacity-75 border border-gray-200 dark:border-gray-700'
                            : 'bg-white dark:bg-gray-700 hover:shadow-lg transform hover:scale-[1.01] border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                        }
                    `}
                >
                    <div className="flex items-start sm:items-center flex-grow mb-4 sm:mb-0 w-full sm:w-auto">
                        <input
                            type="checkbox"
                            checked={task.status === 'Completed'}
                            onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400 rounded focus:ring-blue-500 cursor-pointer flex-shrink-0"
                        />
                        <div className="ml-4 flex-grow">
                            <h3 className={`text-lg md:text-xl font-semibold mb-1 ${task.status === 'Completed' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                                {task.title}
                            </h3>
                            {task.description && (
                                <p className={`text-sm ${task.status === 'Completed' ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
                                    {task.description}
                                </p>
                            )}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm mt-2 space-y-2 sm:space-y-0 sm:space-x-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColorClasses(task.priority)}`}>
                                    {task.priority} Priority
                                </span>
                                <span className="text-gray-500 dark:text-gray-400">
                                    Due: {task.dueDate}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-2 ml-auto sm:ml-4 w-full sm:w-auto justify-end">
                        <button
                            onClick={() => onEdit(task)}
                            className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={task.status === 'Completed'}
                            title="Edit Task"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 transition-colors"
                            title="Delete Task"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;