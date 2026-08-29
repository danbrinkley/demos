import { describe, expect, it } from 'vitest';
import { dayLabel, DEMO_TODAY, formatLongDate, relativeDueLabel, relativeSinceLabel } from './demoDate';

describe('demoDate', () => {
  it('formats DEMO_TODAY as the expected long date', () => {
    expect(formatLongDate(DEMO_TODAY)).toBe('Monday, August 31');
  });

  it('derives "Due today" / "Due tomorrow" / "Due in N days" from the gap to DEMO_TODAY', () => {
    expect(relativeDueLabel('2026-08-31')).toBe('Due today');
    expect(relativeDueLabel('2026-09-01')).toBe('Due tomorrow');
    expect(relativeDueLabel('2026-09-02')).toBe('Due in 2 days');
    expect(relativeDueLabel('2026-09-04')).toBe('Due in 4 days');
  });

  it('derives an overdue phrase for past dates', () => {
    expect(relativeDueLabel('2026-08-30')).toBe('Due yesterday');
    expect(relativeDueLabel('2026-08-28')).toBe('Due 3 days ago');
  });

  it('phrases something already past as "N days ago"', () => {
    expect(relativeSinceLabel('2026-08-28')).toBe('3 days ago');
    expect(relativeSinceLabel('2026-08-31')).toBe('today');
  });

  it('labels the current day as "Today" and other days by weekday name', () => {
    expect(dayLabel('2026-08-31')).toBe('Today');
    expect(dayLabel('2026-09-02')).toBe('Wednesday');
    expect(dayLabel('2026-09-03')).toBe('Thursday');
  });
});
