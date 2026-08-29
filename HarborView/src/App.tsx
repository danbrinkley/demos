import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/shell/AppShell';
import { HomePage } from './features/home/HomePage';
import { NewsPage } from './routes/NewsPage';
import { ResourcesPage } from './routes/ResourcesPage';
import { WorkspaceDataProvider } from './state/WorkspaceDataContext';

export default function App() {
  return (
    <WorkspaceDataProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </AppShell>
    </WorkspaceDataProvider>
  );
}
