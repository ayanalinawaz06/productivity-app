import React from 'react';
import type { Note } from '../features/notes/types';

interface NoteListProps {
    notes: Note[];
    onEdit: (note: Note) => void;
    onDelete: (id: string) => void;
    onToggleFavorite: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onEdit, onDelete, onToggleFavorite }) => {
    if (notes.length === 0) {
        return <p className="text-gray-600 dark:text-gray-400 text-center py-8">No notes found. Add a new note to get started!</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
                <div key={note.id} className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 flex flex-col justify-between
                                            hover:shadow-lg transform hover:scale-[1.01] transition-all duration-200 ease-in-out
                                            border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                            {note.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-200 text-sm mb-4 line-clamp-4 leading-relaxed">
                            {note.content}
                        </p>
                        {note.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {note.tags.map((tag) => (
                                    <span key={tag} className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-600 space-y-3 sm:space-y-0">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Created: {new Date(note.createdAt).toLocaleDateString()}
                            <br />
                            Updated: {new Date(note.updatedAt).toLocaleDateString()}
                        </div>
                        <div className="flex space-x-2 ml-auto">
                            <button
                                onClick={() => onToggleFavorite(note.id)}
                                className="p-2 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors"
                                title={note.isFavorite ? 'Unfavorite' : 'Favorite'}
                            >
                                {note.isFavorite ? (
                                    <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.034a1 1 0 00-1.175 0l-2.817 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 text-gray-400 hover:text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.034a1 1 0 00-1.175 0l-2.817 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                )}
                            </button>
                            <button
                                onClick={() => onEdit(note)}
                                className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                                title="Edit Note"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            </button>
                            <button
                                onClick={() => onDelete(note.id)}
                                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 transition-colors"
                                title="Delete Note"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NoteList;