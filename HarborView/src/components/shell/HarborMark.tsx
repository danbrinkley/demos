/** Minimal horizon/dot mark — the one piece of logo system this build needs. */
export function HarborMark() {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" className="hv-brand__mark">
      <path
        d="M4 20c3-2.5 6-2.5 9 0s6 2.5 9 0s4-2 4-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <circle cx="22" cy="10.5" r="3" fill="var(--hv-coral)" />
    </svg>
  );
}
