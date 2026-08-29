import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Commitment } from '../../data/types';
import { ThisWeekSection } from './ThisWeekSection';

describe('ThisWeekSection', () => {
  it('renders each commitment with its source label', () => {
    const commitments: Commitment[] = [
      { id: 'c1', label: 'Program check-in', date: '2026-08-31', source: 'project' },
      { id: 'c2', label: 'Board materials due', date: '2026-09-02', source: 'org' },
      { id: 'c3', label: 'Alvarez out of office', date: '2026-09-03', source: 'travel' },
    ];
    render(<ThisWeekSection commitments={commitments} />);

    expect(screen.getByText('Program check-in')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Board materials due')).toBeInTheDocument();
    expect(screen.getByText('Organizational')).toBeInTheDocument();
    expect(screen.getByText('Alvarez out of office')).toBeInTheDocument();
    expect(screen.getByText('Travel')).toBeInTheDocument();
  });

  it('shows a calm empty state for a light week', () => {
    render(<ThisWeekSection commitments={[]} />);
    expect(screen.getByText('A light week — nothing else on the calendar.')).toBeInTheDocument();
  });
});
