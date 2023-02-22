import { useState, useEffect } from 'react';
import createFocusTrap, { FocusTrap } from 'focus-trap';

const toggleTrap = (trap: FocusTrap, isActive: boolean): void => {
  if (isActive) {
    trap.activate();
  } else {
    trap.deactivate();
  }
}

export default function useFocusTrap(
  element: HTMLElement | null,
  isActive = false,
  initialFocus: HTMLElement | null,
): void {
  const [trap, setTrap] = useState<FocusTrap>();

  // If `initialFocus` is not provided, `element` becomes the initial focus.
  const initialFocusElement = initialFocus || element;

  useEffect(() => {
    if (trap) {
      toggleTrap(trap, isActive);
    } else if (element && initialFocusElement && isActive) {
      const newTrap = createFocusTrap(element, {
        clickOutsideDeactivates: true,
        initialFocus: initialFocusElement,
      });
      setTrap(newTrap);
      toggleTrap(newTrap, isActive);
    }

    return () => {
      if (trap) {
        trap.deactivate();
      }
    };
  }, [element, isActive, trap, initialFocusElement]);
}
