import {useRef, useState, useEffect} from 'react';
import {AppState} from 'react-native';

function useAppState() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isComback, setIsComback] = useState<boolean>(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        // 비활성화 | 백그라운드 상태.
        appState.current.match(/inactive|background/) &&
        // 그 다음 상태가 active
        nextAppState === 'active'
      ) {
        setIsComback(true);
      }

      if (appState.current.match(/active/) && nextAppState === 'background') {
        setIsComback(false);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {isComback, appStateVisible};
}

export default useAppState;
