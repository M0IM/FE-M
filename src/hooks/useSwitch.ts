import { useState } from "react";

const useSwitch = <T extends Record<string, boolean>>(initialState: T) => {
  const [switches, setSwitches] = useState<T>(initialState);

  const toggleSwitch = (key: keyof T) => {
    setSwitches((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return { switches, toggleSwitch };
};

export default useSwitch;