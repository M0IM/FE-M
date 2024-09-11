import {useRef} from 'react';

const THROTTLE_DEFAULT_TIME = 1 * 1000;

const useThrottle = <T extends (...args: any[]) => void>(
  callback: T,
  throttleTime: number = THROTTLE_DEFAULT_TIME,
): ((...args: Parameters<T>) => void) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: Parameters<T>) => {
    if (timer.current) return;

    callback(...args);
    timer.current = setTimeout(() => {
      timer.current = null;
    }, throttleTime);
  };
};

export default useThrottle;
