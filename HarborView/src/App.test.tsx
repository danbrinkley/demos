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

  it('shows no organizational alert on a normal day', () => {
    renderApp();
    expect(screen.queryByText(/office closed/i)).not.toBeInTheDocument();
  });

  it('shows the two primary items, three attention items, and three commitments from one shared data source', () => {
    renderApp();

    expect(screen.getByRole('heading', { name: 'What needs you' })).toBeInTheDocument();
    expect(screen.getByText('Expense pending approval')).toBeInTheDocument();
    expect(screen.getByText('Program report due')).toBeInTheDocument();

    expect(screen.getByText('Expense: consultant payment')).toBeInTheDocument();
    expect(screen.getByText('Intake form awaiting review')).toBeInTheDocument();
    expect(screen.getByText('Volunteer hours to log')).toBeInTheDocument();

    expect(screen.getByText('Program check-in')).toBeInTheDocument();
    expect(screen.getByText('Board materials due')).toBeInTheDocument();
    expect(screen.getByText('Alvarez out of office')).toBeInTheDocument();
  });

  it('marks Home as the active nav item and navigates to the Resources and News placeholders', async () => {
    const user = userEvent.setup();
    renderApp();

    const nav = screen.getByRole('navigation', { name: 'Primary' });
    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');

    await user.click(within(nav).getByRole('link', { name: 'Resources' }));
    expect(screen.getByRole('heading', { name: 'Resources' })).toBeInTheDocument();

    await user.click(within(nav).getByRole('link', { name: 'News' }));
    expect(screen.getByRole('heading', { name: 'News' })).toBeInTheDocument();
  });

  it('completes the expense approval end to end: open, approve, reflect, and announce', async () => {
    const user = userEvent.setup();
    renderApp();

    // 1. Open the expense item's detail panel.
    const reviewButton = screen.getByRole('button', { name: /Review expense/ });
    await user.click(reviewButton);
    expect(reviewButton).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByText(/Mileage and supplies for Community Outreach/),
    ).toBeInTheDocument();

    // 2. Approve it from inside the panel.
    const approveButton = screen.getByRole('button', { name: 'Approve' });
    await user.click(approveButton);

    // 3. The primary card reflects the approved state — both the status pill
    // and the detail panel's closure message read "Approved — sent to Finance".
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
    expect(screen.getByRole('button', { name: /Review expense/ })).toHaveAttribute('aria-expanded', 'true');
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
