import { useState, useEffect } from "react";

function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
): boolean {
  const [isOutsideClick, setIsOutsideClick] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOutsideClick(true);
        callback();
      } else {
        setIsOutsideClick(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);

  return isOutsideClick;
}

export default useOutsideClick;
