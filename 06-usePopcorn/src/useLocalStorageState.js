import { useEffect, useState } from "react";

export function useLocalStorageState(intialState, key) {
  const [value, setValue] = useState(function () {
    const getValue = JSON.parse(localStorage.getItem(key));
    return getValue ? getValue : intialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value]
  );

  return [value, setValue];
}
