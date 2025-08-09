import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import type { Task } from '../features/tasks/types';

const taskFormSchema = z.object({
    title: z.string().min(3, 'Title is required (min 3 characters)').max(60, 'Title cannot exceed 60 characters'),
    description: z.string().optional(),
    dueDate: z.string().refine((val) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inputDate = new Date(val);
        inputDate.setHours(0, 0, 0, 0);
        return inputDate >= today;
    }, 'Due date must be today or in the future'),
    priority: z.enum(['Low', 'Medium', 'High'], {
        message: 'Priority is required',
    }),
});

type TaskFormInputs = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
    onSubmit: (data: Omit<Task, 'id' | 'status'>) => void;
    initialData?: Task;
    onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData, onCancel }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TaskFormInputs>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: initialData || {
            title: '',
            description: '',
            dueDate: new Date().toISOString().split('T')[0],
            priority: 'Medium',
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                dueDate: initialData.dueDate
            });
        } else {
            reset({
                title: '',
                description: '',
                dueDate: new Date().toISOString().split('T')[0],
                priority: 'Medium',
            });
        }
    }, [initialData, reset]);

    const handleFormSubmit = (data: TaskFormInputs) => {
        onSubmit(data);
        if (!initialData) {
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 p-6 bg-white dark:bg-gray-700 shadow-lg rounded-xl border border-gray-200 dark:border-gray-600">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Task Title</label>
                <input
                    id="title"
                    type="text"
                    {...register('title')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white p-2"
                />
                {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Description (Optional)</label>
                <textarea
                    id="description"
                    {...register('description')}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white p-2"
                ></textarea>
                {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
            </div>

            <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Due Date</label>
                <input
                    id="dueDate"
                    type="date"
                    {...register('dueDate')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white p-2"
                />
                {errors.dueDate && <p className="mt-1 text-xs text-red-600">{errors.dueDate.message}</p>}
            </div>

            <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Priority</span>
                <div className="mt-2 space-x-4 flex">
                    {['Low', 'Medium', 'High'].map((p) => (
                        <label key={p} className="inline-flex items-center cursor-pointer">
                            <input
                                type="radio"
                                {...register('priority')}
                                value={p}
                                className="form-radio text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 h-4 w-4 transition-colors duration-150"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-200 text-sm">{p}</span>
                        </label>
                    ))}
                </div>
                {errors.priority && <p className="mt-1 text-xs text-red-600">{errors.priority.message}</p>}
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-600">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 shadow-sm"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                    {initialData ? 'Update Task' : 'Add Task'}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;