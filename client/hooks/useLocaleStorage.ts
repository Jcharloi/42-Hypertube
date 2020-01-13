import { useState } from "react";

const useLocaleStorage = (): [Record<string, string>, Function] => {
  const [localStorageData, setLocalStorageData] = useState({ ...localStorage });

  const setItem = (key: string, value: string): void => {
    window.localStorage.setItem(key, value);
    setLocalStorageData({ ...localStorage });
  };

  return [localStorageData, setItem];
};

export default useLocaleStorage;
