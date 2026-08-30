import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../../App';

function renderPage(path = '/my-work') {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
}

describe('My Work', () => {
  it('is reachable through the shared Home header and opens the expense context', async () => {
    const user = userEvent.setup();
    renderPage('/');
    const nav = screen.getByRole('navigation', { name: 'Primary' });
    await user.click(within(nav).getByRole('link', { name: 'My Work' }));
    expect(screen.getByRole('heading', { level: 1, name: 'My Work' })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'My Work' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Approve expense' })).toBeInTheDocument();
  });

  it('moves approved work to Completed and updates Home counts', async () => {
    const user = userEvent.setup(); renderPage();
    await user.click(screen.getByRole('button', { name: 'Approve expense' }));
    expect(screen.getByRole('tab', { name: 'Completed 1' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Needs me 3' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Approve expense' })).not.toBeInTheDocument();
    expect(screen.getByText('Expense approved and sent to Finance.')).toBeInTheDocument();
    await user.click(within(screen.getByRole('navigation', { name: 'Primary' })).getByRole('link', { name: 'Home' }));
    const summary = screen.getByRole('region', { name: 'Today at a glance' });
    expect(within(summary).getByText('3 still open')).toBeInTheDocument();
    await user.click(within(screen.getByRole('navigation', { name: 'Primary' })).getByRole('link', { name: 'My Work' }));
    await user.click(screen.getByRole('tab', { name: 'Completed 1' }));
    expect(screen.getByRole('button', { name: /Expense pending approval/ })).toBeInTheDocument();
  });

  it('shows submitted requests separately and supports keyboard tabs', async () => {
    const user = userEvent.setup(); renderPage();
    screen.getByRole('tab', { name: 'Needs me 4' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Waiting on others 3' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: /Volunteer laptop access/ }));
    expect(screen.getByText(/no action is required from you right now/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Approve expense' })).not.toBeInTheDocument();
  });

  it('filters, clears a no-match state, and sorts without changing shared records', async () => {
    const user = userEvent.setup(); renderPage();
    await user.selectOptions(screen.getByRole('combobox', { name: 'Work type' }), 'Payment');
    expect(screen.getByRole('button', { name: /Expense: consultant payment/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Volunteer hours to log/ })).not.toBeInTheDocument();
    await user.selectOptions(screen.getByRole('combobox', { name: 'Project or area' }), 'Community Outreach');
    expect(screen.getByText('No matching items')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    await user.selectOptions(screen.getByRole('combobox', { name: 'Sort work' }), 'title');
    const list = screen.getByRole('region', { name: 'Needs me work items' });
    expect(within(list).getAllByRole('button')[0]).toHaveTextContent('Expense pending approval');
    expect(within(list).getAllByRole('button')).toHaveLength(4);
  });

  it('explains disconnected documents and closes details with Escape', async () => {
    const user = userEvent.setup(); renderPage();
    await user.click(screen.getByRole('button', { name: 'Receipts' }));
    expect(screen.getByText(/Receipts: this is a demonstration/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Open source record' }));
    expect(screen.getByText(/no live source record is connected/)).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('heading', { name: 'Select an item' })).toBeInTheDocument();
  });

  it('shows an honest empty Completed tab before any work is finished', async () => {
    const user = userEvent.setup(); renderPage();
    await user.click(screen.getByRole('tab', { name: 'Completed 0' }));
    expect(screen.getByText('Nothing completed yet')).toBeInTheDocument();
  });
});
