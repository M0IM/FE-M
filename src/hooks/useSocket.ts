import {useEffect, useCallback, useState} from 'react';
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

  useEffect(() => {
    const connectWebSocket = async () => {
      if (isLogin) {
        const token = await getToken();
        if (token) {
          const ws = new WebSocket(
            `${Config.WEB_SOCKET_URL}/chat?token=${token}`,
          );

          ws.onopen = () => {
            console.log('WebSocket connection opened');
          };

          ws.onmessage = event => {
            console.log('WebSocket message received:', event.data);
          };

          ws.onclose = event => {
            console.log('WebSocket connection closed:', event.reason);
            setSocket(null);
          };

          ws.onerror = error => {
            console.error('WebSocket error:', error);
          };

          setSocket(ws);
        }
      }
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [isLogin]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [socket]);

  return [socket, disconnect];
};

export default useSocket;
