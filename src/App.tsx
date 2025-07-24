// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import DashboardPage from './features/dashboard/DashboardPage.tsx';
import TasksPage from './features/tasks/TasksPage';
import NotesPage from './features/notes/NotesPage.tsx';
import FocusTimerPage from './features/timer/FocusTimerPage';
import HabitsPage from './features/habits/HabitsPage.tsx';
import Layout from './components/Layout.tsx';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/focus-timer" element={<FocusTimerPage />} />
          <Route path="/habits" element={<HabitsPage />} />
        </Routes>
      </Layout>
      <Toaster />
    </>
  );
}

export default App;