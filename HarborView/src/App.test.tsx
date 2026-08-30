import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';

function renderApp(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Workspace Home', () => {
  it('greets Jordan with the fixed demonstration date', () => {
    renderApp();
    expect(screen.getByRole('heading', { level: 1, name: 'Good morning, Jordan' })).toBeInTheDocument();
    expect(screen.getByText('Monday, August 31')).toBeInTheDocument();
  });

  it('shows the current organization-wide notice', () => {
    renderApp();
    expect(screen.getByText(/Main office closed Monday, September 7/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View details' })).toHaveAttribute('href', '/resources#office-closure');
  });

  it('shows consistent workload summaries, detailed work views, and upcoming commitments', () => {
    renderApp();

    const summary = screen.getByRole('region', { name: 'Today at a glance' });
    expect(within(summary).getByRole('heading', { level: 3, name: 'My tasks' })).toBeInTheDocument();
    expect(within(summary).getByRole('heading', { level: 3, name: 'My requests' })).toBeInTheDocument();
    expect(within(summary).getByRole('heading', { level: 3, name: 'Active projects' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'My tasks' })).toBeInTheDocument();
    expect(screen.getByText('Expense pending approval')).toBeInTheDocument();
    expect(screen.getByText('Expense: consultant payment')).toBeInTheDocument();
    expect(screen.getByText('Intake form awaiting review')).toBeInTheDocument();
    expect(screen.getByText('Volunteer hours to log')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'My requests' })).toBeInTheDocument();
    expect(screen.getByText('Fall Food Drive communications support')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Active projects' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Community Impact Report' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Upcoming' })).toBeInTheDocument();
    expect(screen.getByText('Program check-in')).toBeInTheDocument();
    expect(screen.getByText('Board materials due')).toBeInTheDocument();
    expect(screen.getByText('Alvarez out of office')).toBeInTheDocument();
  });

  it('marks Home as active and navigates to Knowledge and News', async () => {
    const user = userEvent.setup();
    renderApp();

    const nav = screen.getByRole('navigation', { name: 'Primary' });
    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');

    await user.click(within(nav).getByRole('link', { name: 'Knowledge' }));
    expect(screen.getByRole('heading', { name: 'Knowledge' })).toBeInTheDocument();

    await user.click(within(nav).getByRole('link', { name: 'News' }));
    expect(screen.getByRole('heading', { name: 'News' })).toBeInTheDocument();
  });

  it('completes the expense approval end to end: open, approve, reflect, and announce', async () => {
    const user = userEvent.setup();
    renderApp();

    // 1. Open the expense item's detail panel.
    const reviewButton = screen.getByRole('button', { name: /Expense pending approval/ });
    await user.click(reviewButton);
    expect(reviewButton).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByText(/Mileage and supplies for Community Outreach/),
    ).toBeInTheDocument();

    // 2. Approve it from inside the panel.
    const approveButton = screen.getByRole('button', { name: 'Approve' });
    await user.click(approveButton);

    // 3. The task row and detail panel reflect the approved state.
    expect(screen.getAllByText('Approved — sent to Finance').length).toBeGreaterThanOrEqual(2);
    expect(screen.queryByRole('button', { name: 'Approve' })).not.toBeInTheDocument();

    // 4. ...and a live-region message announces completion.
    expect(screen.getByRole('status')).toHaveTextContent('Expense approved and sent to Finance.');
  });

  it('finds and opens a work item from global search, labeling results by type', async () => {
    const user = userEvent.setup();
    renderApp('/resources');

    const searchInputs = screen.getAllByRole('searchbox', { name: 'Search Harbor View' });
    await user.type(searchInputs[0], 'expense');

    const result = await screen.findByRole('button', { name: /Expense pending approval/ });
    expect(within(result).getByText('Work item')).toBeInTheDocument();
    await user.click(result);

    // Selecting a work item result should route back to Home and open its panel.
    expect(await screen.findByRole('heading', { level: 1, name: 'Good morning, Jordan' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Expense pending approval/ })).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows a clear placeholder when a search result is outside Week 1 scope', async () => {
    const user = userEvent.setup();
    renderApp();

    const searchInputs = screen.getAllByRole('searchbox', { name: 'Search Harbor View' });
    await user.type(searchInputs[0], 'Priya');

    await user.click(await screen.findByRole('button', { name: /Priya Anand/ }));
    expect(screen.getByText('Staff profiles are coming soon to Harbor View.')).toBeInTheDocument();
  });
});
