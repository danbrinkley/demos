import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OrgAlertBanner } from './OrgAlertBanner';

describe('OrgAlertBanner', () => {
  it('renders nothing — no placeholder box — when there is no alert', () => {
    const { container } = render(<OrgAlertBanner alert={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the message when an alert is present', () => {
    render(<OrgAlertBanner alert={{ id: 'a1', message: 'Office closed Friday for staff training', severity: 'notice' }} />);
    expect(screen.getByText('Office closed Friday for staff training')).toBeInTheDocument();
  });
});
