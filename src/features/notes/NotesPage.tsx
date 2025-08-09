import React, { useState } from 'react';
import NoteForm from '../../components/NoteForm';
import NoteList from '../../components/NoteList';
import { useNotes } from './useNotes';
import type { Note } from './types';
import toast from 'react-hot-toast';

const NotesPage: React.FC = () => {
    const { notes, addNote, updateNote, deleteNote, toggleFavorite, searchTerm, setSearchTerm, sortBy, setSortBy } = useNotes();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<Note | undefined>(undefined);

    const handleAddNote = (newNoteData: Omit<Note, 'id' | 'isFavorite' | 'createdAt' | 'updatedAt'>) => {
        addNote(newNoteData);
        setIsFormVisible(false);
        toast.success('Note added successfully!');
    };

    const handleEditNote = (note: Note) => {
        setNoteToEdit(note);
        setIsFormVisible(true);
    };

    const handleUpdateNote = (updatedData: Omit<Note, 'id' | 'isFavorite' | 'createdAt' | 'updatedAt'>) => {
        if (noteToEdit) {
            updateNote({ ...noteToEdit, ...updatedData });
            setNoteToEdit(undefined);
            setIsFormVisible(false);
            toast.success('Note updated successfully!');
        }
    };

    const handleCancelForm = () => {
        setIsFormVisible(false);
        setNoteToEdit(undefined);
    };

    const handleDeleteNote = (id: string) => {
        deleteNote(id);
        toast.error('Note deleted!');
    };

    const handleToggleFavorite = (id: string) => {
        toggleFavorite(id);
        const note = notes.find(n => n.id === id);
        if (note && !note.isFavorite) {
            toast.success('Note marked as favorite! ⭐');
        } else {
            toast('Note unfavorited.');
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value as 'newest' | 'oldest');
    };

    return (
        <div className="p-4 sm:p-6 min-h-[calc(100vh-64px)]">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-purple-700 dark:text-purple-400">Notes App</h1>

            <div className="max-w-4xl mx-auto mb-8">
                <button
                    onClick={() => {
                        setIsFormVisible(!isFormVisible);
                        setNoteToEdit(undefined);
                    }}
                    className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-transform transform hover:scale-105"
                >
                    {isFormVisible ? 'Hide Form' : 'Add New Note'}
                </button>

                {isFormVisible && (
                    <div className="mt-6">
                        <NoteForm
                            onSubmit={noteToEdit ? handleUpdateNote : handleAddNote}
                            initialData={noteToEdit}
                            onCancel={handleCancelForm}
                        />
                    </div>
                )}
            </div>

            <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <input
                    type="text"
                    placeholder="Search by title or tag..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full sm:w-2/3 py-2 px-3 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-600 dark:text-white"
                />
                <div className="w-full sm:w-auto">
                    <label htmlFor="sortNotes" className="sr-only">Sort Notes</label>
                    <select
                        id="sortNotes"
                        value={sortBy}
                        onChange={handleSortChange}
                        className="w-full py-2 px-3 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-600 dark:text-white"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Your Notes</h2>
                <NoteList
                    notes={notes}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                    onToggleFavorite={handleToggleFavorite}
                />
            </div>
        </div>
    );
};

export default NotesPage;