import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/shell/AppShell';
import { HomePage } from './features/home/HomePage';
import { MyWorkPage } from './features/my-work/MyWorkPage';
import { KnowledgePage } from './features/knowledge/KnowledgePage';
import { ExpenseGuidePage, KnowledgeHelpPage, KnowledgeResourcePage } from './features/knowledge/KnowledgeGuidePage';
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
          <Route path="/my-work" element={<MyWorkPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/knowledge/expense-reporting" element={<ExpenseGuidePage />} />
          <Route path="/knowledge/resource/:resourceId" element={<KnowledgeResourcePage />} />
          <Route path="/knowledge/help" element={<KnowledgeHelpPage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </AppShell>
    </WorkspaceDataProvider>
  );
}
