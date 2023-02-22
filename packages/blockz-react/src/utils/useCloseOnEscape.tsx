import { useEffect } from 'react';

const ESC_KEY = 27;
const EVENT_NAME = 'keyup';

export default function useCloseOnEscape(onClose: () => void, isActive = false): void {
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (isActive && event.keyCode === ESC_KEY) {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener(EVENT_NAME, handleKeyUp);
    return () => {
      document.removeEventListener(EVENT_NAME, handleKeyUp);
    };
  }, [onClose, isActive]);
}
