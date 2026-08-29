import { Newspaper } from 'lucide-react';
import { PlaceholderPage } from './PlaceholderPage';

export function NewsPage() {
  return (
    <PlaceholderPage
      icon={<Newspaper />}
      title="News"
      description="Organization announcements and curated updates will live here — the broadcast layer that keeps Home focused on what needs you."
    />
  );
}
