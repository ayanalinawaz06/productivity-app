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

    const getPriorityColor = (priority: Task['priority']) => {
        switch (priority) {
            case 'High': return 'text-red-600 dark:text-red-400';
            case 'Medium': return 'text-yellow-600 dark:text-yellow-400';
            case 'Low': return 'text-green-600 dark:text-green-400';
            default: return 'text-gray-600 dark:text-gray-400';
        }
    };

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={`p-4 rounded-lg shadow-md flex items-center justify-between
                        ${task.status === 'Completed' ? 'bg-gray-200 dark:bg-gray-600 line-through text-gray-500' : 'bg-white dark:bg-gray-700'}`
                    }
                >
                    <div className="flex items-center flex-grow">
                        <input
                            type="checkbox"
                            checked={task.status === 'Completed'}
                            onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400 rounded focus:ring-blue-500"
                        />
                        <div className="ml-4 flex-grow">
                            <h3 className={`text-lg font-semibold ${task.status === 'Completed' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                                {task.title}
                            </h3>
                            {task.description && (
                                <p className={`text-sm ${task.status === 'Completed' ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
                                    {task.description}
                                </p>
                            )}
                            <div className="flex items-center text-sm mt-1">
                                <span className={`font-medium ${getPriorityColor(task.priority)}`}>
                                    Priority: {task.priority}
                                </span>
                                <span className="ml-4 text-gray-500 dark:text-gray-400">
                                    Due: {task.dueDate}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                        <button
                            onClick={() => onEdit(task)}
                            className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition disabled:opacity-50"
                            disabled={task.status === 'Completed'}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;