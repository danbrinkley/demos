import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../../App';

function renderPage(path = '/knowledge') {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
}

describe('Knowledge journeys', () => {
  it('distinguishes tasks, topics, and updates with four task entry points', () => {
    renderPage();
    expect(screen.getAllByRole('link', { name: /: view guide$/ })).toHaveLength(4);
    expect(screen.getByRole('heading', { name: 'What do you need to do?' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Browse by topic' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Recently updated' })).toBeInTheDocument();
    expect(screen.queryByText('Ways of working')).not.toBeInTheDocument();
  });
  it('searches, focuses the results heading, and opens the guide', async () => {
    const user = userEvent.setup(); renderPage();
    await user.type(screen.getByRole('searchbox', { name: 'Search knowledge' }), 'expense report{Enter}');
    expect(screen.getByRole('heading', { name: 'Results for “expense report”' })).toHaveFocus();
    await user.click(screen.getByRole('link', { name: /Expense reporting guide/ }));
    expect(screen.getByRole('heading', { level: 1, name: 'Expense reporting' })).toBeInTheDocument();
  });
  it('filters by topic and clears back to the task landing', async () => {
    const user = userEvent.setup(); renderPage();
    await user.click(within(screen.getByRole('navigation', { name: 'Knowledge topics' })).getByRole('link', { name: /Finance/ }));
    expect(screen.getByText('4 resources')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Volunteer onboarding checklist/ })).not.toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Clear search and filters' }));
    expect(screen.getByRole('heading', { name: 'What do you need to do?' })).toBeInTheDocument();
  });
  it('handles empty results and provides a way to ask for help', async () => {
    const user = userEvent.setup(); renderPage('/knowledge?q=missing-xyz');
    expect(screen.getByRole('heading', { name: 'No matching resources' })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /Find someone to ask/ }));
    expect(screen.getByRole('heading', { name: 'Ask the right team' })).toBeInTheDocument();
  });
  it('opens the expense template preview and returns to the complete guide', async () => {
    const user = userEvent.setup(); renderPage('/knowledge/expense-reporting');
    await user.click(screen.getByRole('link', { name: /Expense report template/ }));
    expect(screen.getByRole('heading', { level: 1, name: 'Expense report template' })).toBeInTheDocument();
    expect(screen.getByText('Employee and report period')).toBeInTheDocument();
    expect(screen.getByText(/This is not a live document/)).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /Back to expense reporting/ }));
    expect(screen.getByRole('heading', { name: 'How to submit' })).toBeInTheDocument();
  });
  it('does not pretend to submit a report or send a message', async () => {
    const user = userEvent.setup(); renderPage('/knowledge/expense-reporting');
    await user.click(screen.getByRole('button', { name: 'Start an expense report' }));
    expect(screen.getByText(/No report has been submitted/)).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Contact Finance' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Ask Finance' })).toBeInTheDocument();
    expect(screen.getByText(/No message will be sent/)).toBeInTheDocument();
  });
  it('connects the guide to the Waiting on others tab in My Work', async () => {
    const user = userEvent.setup(); renderPage('/knowledge/expense-reporting');
    await user.click(screen.getByRole('link', { name: 'Go to My Work' }));
    expect(screen.getByRole('tab', { name: /Waiting on others/ })).toHaveAttribute('aria-selected', 'true');
  });
  it('links the footer expense essential to the guide', async () => {
    const user = userEvent.setup(); renderPage('/');
    await user.click(within(screen.getByRole('contentinfo')).getByRole('link', { name: 'Expense reporting' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Expense reporting' })).toBeInTheDocument();
  });
  it('opens the knowledge guide from global search', async () => {
    const user = userEvent.setup(); renderPage('/');
    await user.type(screen.getAllByRole('searchbox', { name: 'Search Harbor View' })[0], 'Expense reporting');
    await user.click(await screen.findByRole('button', { name: /Expense reporting guide/ }));
    expect(screen.getByRole('heading', { level: 1, name: 'Expense reporting' })).toBeInTheDocument();
  });
  it('preserves old expense links and handles missing resources', () => {
    const view = renderPage('/resources#expenses');
    expect(screen.getByRole('heading', { level: 1, name: 'Expense reporting' })).toBeInTheDocument();
    view.unmount(); renderPage('/knowledge/resource/unknown');
    expect(screen.getByRole('heading', { name: 'Resource not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to Knowledge' })).toBeInTheDocument();
  });
});
