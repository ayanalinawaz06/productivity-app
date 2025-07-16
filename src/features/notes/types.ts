export interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    isFavorite: boolean;
    createdAt: string;
    updatedAt: string;
}