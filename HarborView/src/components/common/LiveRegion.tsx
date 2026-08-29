interface LiveRegionProps {
  message: string;
}

/**
 * Single application-wide polite live region. Kept as one instance so
 * screen readers reliably announce status changes (e.g. "Expense approved
 * and sent to Finance.") no matter which component triggered them.
 */
export function LiveRegion({ message }: LiveRegionProps) {
  return (
    <div role="status" aria-live="polite" className="hv-visually-hidden">
      {message}
    </div>
  );
}
