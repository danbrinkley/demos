/**
 * Fixed demonstration "today" so due-date language, sample data, and tests
 * stay deterministic regardless of the machine's real clock.
 *
 * Everything derived from a date (relative phrases like "Due in 2 days",
 * "Today", weekday labels) must be computed from DEMO_TODAY rather than
 * hard-coded, so the data and the copy can never drift apart.
 */
export const DEMO_TODAY = '2026-08-31';

const WEEKDAY_LABELS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/** Parses an ISO ("YYYY-MM-DD") date string as a local calendar date (no time-zone drift). */
function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Whole-day difference between two ISO dates: positive when `iso` is in the future. */
export function daysFromToday(iso: string, today: string = DEMO_TODAY): number {
  const start = parseIsoDate(today);
  const end = parseIsoDate(iso);
  return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
}

/** "Monday, August 31" style long date, used for the greeting. */
export function formatLongDate(iso: string): string {
  const date = parseIsoDate(iso);
  return `${WEEKDAY_LABELS[date.getDay()]}, ${MONTH_LABELS[date.getMonth()]} ${date.getDate()}`;
}

/** "Sept 2" style short date, used in compact list rows. */
export function formatShortDate(iso: string): string {
  const date = parseIsoDate(iso);
  const month = MONTH_LABELS[date.getMonth()].slice(0, 3);
  return `${month} ${date.getDate()}`;
}

export function weekdayLabel(iso: string): string {
  return WEEKDAY_LABELS[parseIsoDate(iso).getDay()];
}

/**
 * Human due-date phrasing derived from the gap between an ISO date and
 * DEMO_TODAY. Kept as one function so no component hand-writes its own
 * "Due in N days" string that could drift from the underlying date.
 */
export function relativeDueLabel(iso: string, today: string = DEMO_TODAY): string {
  const diff = daysFromToday(iso, today);
  if (diff < 0) {
    const overdue = Math.abs(diff);
    return overdue === 1 ? 'Due yesterday' : `Due ${overdue} days ago`;
  }
  if (diff === 0) return 'Due today';
  if (diff === 1) return 'Due tomorrow';
  return `Due in ${diff} days`;
}

/** Same idea, phrased for something already past ("Submitted") rather than due. */
export function relativeSinceLabel(iso: string, today: string = DEMO_TODAY): string {
  const diff = Math.abs(daysFromToday(iso, today));
  if (diff === 0) return 'today';
  if (diff === 1) return '1 day ago';
  return `${diff} days ago`;
}

/** "Today" when the ISO date matches DEMO_TODAY, otherwise its weekday name. */
export function dayLabel(iso: string, today: string = DEMO_TODAY): string {
  return daysFromToday(iso, today) === 0 ? 'Today' : weekdayLabel(iso);
}

export function workWeekStrip(startIso: string = DEMO_TODAY): Array<{ iso: string; weekday: string; day: number }> {
  const start = parseIsoDate(startIso);
  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return { iso: `${year}-${month}-${day}`, weekday: WEEKDAY_LABELS[date.getDay()].slice(0, 3), day: date.getDate() };
  });
}
