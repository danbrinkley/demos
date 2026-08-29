import { useEffect, useRef, useState } from 'react';

/**
 * Shared open/close behavior for the small header popovers (notifications,
 * user menu): Escape closes and returns focus to the trigger, and a click
 * outside the container closes it too.
 */
export function useHeaderPopover<T extends HTMLElement>() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        const trigger = containerRef.current?.querySelector<HTMLButtonElement>('button');
        trigger?.focus();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen, containerRef };
}
