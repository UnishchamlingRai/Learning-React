import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef(null); // Initialize ref with null
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(); // Call isOpenModel if clicked outside the modal
      }
    };
    document.addEventListener("click", handleClickOutside, listenCapturing); // Add event listener

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside,
        listenCapturing
      ); // Clean up the event listener
    };
  }, [handler, ref, listenCapturing]);

  return ref;
}
