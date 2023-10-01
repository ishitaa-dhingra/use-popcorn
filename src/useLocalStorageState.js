import { useState, useEffect } from "react";

export function useLocalStorageState(initialstate, key) {
  //setting the default data stored in local storage
  const [value, setvalue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialstate;
  });

  //storing data in local storage
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setvalue];
}
