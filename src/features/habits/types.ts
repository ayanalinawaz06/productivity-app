export interface Habit {
    id: string;
    title: string;
    frequency: 'Daily' | 'Weekly';
    completionDates: string[];
}