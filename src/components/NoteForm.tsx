// src/components/NoteForm.tsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import type { Note } from '../features/notes/types';

const noteFormSchema = z.object({
    title: z.string().min(1, 'Title is required').max(50, 'Title cannot exceed 50 characters'),
    content: z.string().min(10, 'Content must be at least 10 characters long'),
    tags: z.string().optional(),
});

type NoteFormInputs = z.infer<typeof noteFormSchema>;

interface NoteFormProps {
    onSubmit: (data: Omit<Note, 'id' | 'isFavorite' | 'createdAt' | 'updatedAt'>) => void;
    initialData?: Note;
    onCancel?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, initialData, onCancel }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NoteFormInputs>({
        resolver: zodResolver(noteFormSchema),
        defaultValues: {
            title: initialData?.title || '',
            content: initialData?.content || '',
            tags: initialData?.tags.join(', ') || '', 
        },
    });

    useEffect(() => {
        reset({
            title: initialData?.title || '',
            content: initialData?.content || '',
            tags: initialData?.tags.join(', ') || '',
        });
    }, [initialData, reset]);

    const handleFormSubmit = (data: NoteFormInputs) => {
        const tagsArray = data.tags
            ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
            : [];

        onSubmit({ ...data, tags: tagsArray }); 
        if (!initialData) {
            reset({
                title: '',
                content: '',
                tags: '',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 p-4 bg-white dark:bg-gray-700 shadow-md rounded-lg">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
                <input
                    id="title"
                    type="text"
                    {...register('title')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Content</label>
                <textarea
                    id="content"
                    {...register('content')}
                    rows={6}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                ></textarea>
                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
            </div>

            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Tags (comma-separated)</label>
                <input
                    id="tags"
                    type="text"
                    {...register('tags')}
                    placeholder="e.g., react, javascript, frontend"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
                {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>}
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    {initialData ? 'Update Note' : 'Add Note'}
                </button>
            </div>
        </form>
    );
};

export default NoteForm;