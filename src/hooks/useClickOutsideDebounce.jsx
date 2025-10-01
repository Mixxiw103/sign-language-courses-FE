import { useEffect, useRef } from "react";

export function useClickOutsideDebounce(onClose, delay = 150) {
  const ref = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        // debounce
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          onClose();
        }, delay);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      clearTimeout(timeoutRef.current);
    };
  }, [onClose, delay]);

  return ref;
}
