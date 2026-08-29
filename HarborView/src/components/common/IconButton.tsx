import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import './IconButton.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  /** Accessible name — required since the visible content is icon-only. */
  label: string;
}

/**
 * Icon-only control with a consistent hit target, hover/focus/active
 * treatment, and a mandatory accessible name (rendered visually hidden).
 * Used by notifications, the user menu trigger, and the search affordance.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, className, ...rest },
  ref,
) {
  return (
    <button ref={ref} type="button" className={`hv-icon-button${className ? ` ${className}` : ''}`} {...rest}>
      <span aria-hidden="true">{icon}</span>
      <span className="hv-visually-hidden">{label}</span>
    </button>
  );
});
