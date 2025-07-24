import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import type { Habit } from '../features/habits/types';

const habitFormSchema = z.object({
    title: z.string().min(1, 'Title is required').max(30, 'Title cannot exceed 30 characters'),
    frequency: z.enum(['Daily', 'Weekly'], {
        message: 'Frequency is required',
    }),
});

type HabitFormInputs = z.infer<typeof habitFormSchema>;

interface HabitFormProps {
    onSubmit: (data: Omit<Habit, 'id' | 'completionDates'>) => void;
    initialData?: Habit;
    onCancel?: () => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ onSubmit, initialData, onCancel }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<HabitFormInputs>({
        resolver: zodResolver(habitFormSchema),
        defaultValues: {
            title: initialData?.title || '',
            frequency: initialData?.frequency || 'Daily',
        },
    });

    useEffect(() => {
        reset({
            title: initialData?.title || '',
            frequency: initialData?.frequency || 'Daily',
        });
    }, [initialData, reset]);

    const handleFormSubmit = (data: HabitFormInputs) => {
        onSubmit(data);
        if (!initialData) {
            reset({
                title: '',
                frequency: 'Daily',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 p-4 bg-white dark:bg-gray-700 shadow-md rounded-lg">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Habit Title</label>
                <input
                    id="title"
                    type="text"
                    {...register('title')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">Frequency</span>
                <div className="mt-2 space-x-4 flex">
                    {['Daily', 'Weekly'].map((f) => (
                        <label key={f} className="inline-flex items-center">
                            <input
                                type="radio"
                                {...register('frequency')}
                                value={f}
                                className="form-radio text-green-600 focus:ring-green-500 dark:text-green-400 dark:focus:ring-green-400"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-200">{f}</span>
                        </label>
                    ))}
                </div>
                {errors.frequency && <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>}
            </div>

            <div className="flex justify-end space-x-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                    {initialData ? 'Update Habit' : 'Add Habit'}
                </button>
            </div>
        </form>
    );
};

export default HabitForm;