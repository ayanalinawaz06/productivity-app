import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import DashboardPage from './features/dashboard/DashboardPage.tsx'; // Placeholder import
import TasksPage from './features/tasks/TasksPage';       // Placeholder import
import NotesPage from './features/notes/NotesPage.tsx';       // Placeholder import
import FocusTimerPage from './features/timer/FocusTimerPage'; // Placeholder import
import HabitsPage from './features/habits/HabitsPage.tsx';     // Placeholder import
import Layout from './components/Layout.tsx'; // To be created

function App() {
  return (
    // Layout component will wrap all pages to provide consistent UI
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/focus-timer" element={<FocusTimerPage />} />
        <Route path="/habits" element={<HabitsPage />} />
        {/* Add a catch-all for 404 later if desired */}
      </Routes>
    </Layout>
  );
}

export default App;