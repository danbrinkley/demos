import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HarborLogo } from './HarborLogo';

describe('Harbor logo', () => {
  it('renders the full accessible lockup with a filled wave and orange sun', () => {
    render(<HarborLogo />);
    const logo = screen.getByRole('img', { name: 'Harbor Community Services' });
    expect(logo).toHaveTextContent('HarborCommunity Services');
    expect(logo.querySelector('svg')).toHaveAttribute('viewBox', '0 0 48 36');
    expect(logo.querySelector('circle')).toHaveAttribute('fill', '#ff6b0b');
    expect(logo.querySelectorAll('path')).toHaveLength(2);
    expect(logo).not.toHaveClass('hv-harbor-logo--inverse');
  });

  it('uses the same mark and wording for the inverse footer version', () => {
    render(<HarborLogo inverse />);
    const logo = screen.getByRole('img', { name: 'Harbor Community Services' });
    expect(logo).toHaveClass('hv-harbor-logo--inverse');
    expect(logo.querySelector('circle')).toHaveAttribute('fill', '#ff6b0b');
    expect(logo).toHaveTextContent('Community Services');
  });
});
