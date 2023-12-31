import { useEffect } from "react";

export function useKey(event, key, action) {
  useEffect(function () {
    function callBack(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener(event, callBack);

    return function () {
      document.removeEventListener(event, callBack);
    };
  }, []);
}
