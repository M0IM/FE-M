import {useEffect, useCallback, useState, useRef} from 'react';
import useAuth from './queries/AuthScreen/useAuth.ts';
import {getEncryptStorage} from '../utils';
import Config from 'react-native-config';

const getToken = async () => {
  const token = await getEncryptStorage('accessToken');
  return token;
};

const useSocket = (): [WebSocket | null, () => void] => {
  const {isLogin} = useAuth();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const retriesRef = useRef(0);
  const maxRetries = 5;

  const connectWebSocket = useCallback(async () => {
    if (isLogin) {
      const token = await getToken();
      console.log(token);
      if (token) {
        const ws = new WebSocket(
          `${Config.WEB_SOCKET_URL}/chat?token=${token}`,
        );

        ws.onopen = () => {
          console.log('WebSocket connection opened');
          retriesRef.current = 0; // 재연결 성공 시 재시도 횟수 초기화
        };

        ws.onmessage = event => {
          console.log('WebSocket message received:', event.data);
        };

        ws.onclose = event => {
          console.log('WebSocket connection closed:', event.reason);
          setSocket(null);

          if (retriesRef.current < maxRetries) {
            retriesRef.current += 1;
            console.log(`Reconnection attempt ${retriesRef.current}...`);
            setTimeout(connectWebSocket, 2000); // 2초 후 재연결 시도
          } else {
            console.log('Max retries reached. No more reconnection attempts.');
          }
        };

        ws.onerror = error => {
          console.error('WebSocket error:', error);
        };

        setSocket(ws);
      }
    }
  }, [isLogin]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [isLogin, connectWebSocket]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [socket]);

  return [socket, disconnect];
};

export default useSocket;
