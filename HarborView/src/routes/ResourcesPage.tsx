import { BookOpen } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';
import { PlaceholderPage } from './PlaceholderPage';

export function ResourcesPage() {
  const { hash } = useLocation();
  const target: Record<string, string> = {
    '': '/knowledge', '#expenses': '/knowledge/expense-reporting', '#timesheets': '/knowledge?topic=people',
    '#time-off': '/knowledge?topic=people', '#benefits': '/knowledge?topic=people', '#it-help': '/knowledge?topic=it',
    '#directory': '/knowledge/help', '#policies': '/knowledge?q=policy', '#accessibility': '/knowledge/help',
  };
  if (target[hash]) return <Navigate to={target[hash]} replace />;
  return (
    <PlaceholderPage
      icon={<BookOpen />}
      title={hash === '#office-closure' ? 'Office closure' : 'Resource not connected'}
      description={hash === '#office-closure' ? 'Main office closed Monday, September 7. This is a sample organization notice for the Harbor View demonstration.' : 'This resource is not connected yet. Choose Knowledge in the header to browse the current demo catalog.'}
    />
  );
}
