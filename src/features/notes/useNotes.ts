import { useState, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Note } from './types';

export function useNotes() {
    const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

    const generateId = () => Math.random().toString(36).substring(2, 11);

    const addNote = (newNoteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>) => {
        const now = new Date().toISOString();
        const noteWithId: Note = {
            ...newNoteData,
            id: generateId(),
            isFavorite: false,
            createdAt: now,
            updatedAt: now,
            tags: newNoteData.tags || [],
        };
        setNotes((prevNotes) => [...prevNotes, noteWithId]);
    };

    const updateNote = (updatedNote: Note) => {
        const now = new Date().toISOString();
        setNotes((prevNotes) =>
            prevNotes.map((note) => (note.id === updatedNote.id ? { ...updatedNote, updatedAt: now } : note))
        );
    };

    const deleteNote = (id: string) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

    const toggleFavorite = (id: string) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, isFavorite: !note.isFavorite, updatedAt: new Date().toISOString() } : note
            )
        );
    };

    const filteredAndSortedNotes = useMemo(() => {
        let currentNotes = [...notes];

        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            currentNotes = currentNotes.filter(
                (note) =>
                    note.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                    note.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
            );
        }

        if (sortBy === 'newest') {
            currentNotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sortBy === 'oldest') {
            currentNotes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        }

        return currentNotes;
    }, [notes, searchTerm, sortBy]);

    return {
        notes: filteredAndSortedNotes,
        addNote,
        updateNote,
        deleteNote,
        toggleFavorite,
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
    };
}