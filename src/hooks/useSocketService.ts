import {getEncryptStorage} from '../utils';
import Config from 'react-native-config';

class WSService {
  private socket: WebSocket | null = null;
  private retries: number = 0;
  private readonly maxRetries: number = 5;

  private async getToken(): Promise<string | null> {
    const token = await getEncryptStorage('accessToken');

    return token;
  }

  public initializeSocket = async (): Promise<void> => {
    try {
      const token = await this.getToken();
      if (!token) {
        throw new Error('Token not found');
      }

      this.connectWebSocket(token);
    } catch (error) {
      console.log('WebSocket initialization error:', error);
    }
  };

  private connectWebSocket(token: string, chatRoomId?: number): void {
    this.socket = new WebSocket(`${Config.WEB_SOCKET_URL}/chat?token=${token}`);
    console.log(token);

    this.socket.onopen = () => {
      console.log('=== WebSocket connected ===');
      this.retries = 0; // Reset retries on successful connection
    };

    this.socket.onclose = event => {
      console.log('=== WebSocket disconnected ===', event.reason);
      this.socket = null;

      if (this.retries < this.maxRetries) {
        this.retries += 1;
        console.log(`Reconnection attempt ${this.retries}...`);
        setTimeout(() => this.connectWebSocket(token), 2000); // Attempt to reconnect after 2 seconds
      } else {
        console.log('Max retries reached. No more reconnection attempts.');
      }
    };

    this.socket.onerror = error => {
      console.log('WebSocket error:', error);
    };

    this.socket.onmessage = message => {
      console.log('WebSocket message received:', message.data);
    };
  }

  public send(data: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify(data);
      this.socket.send(message);
    } else {
      console.log('WebSocket is not connected');
    }
  }

  public emit(event: string, data: any = {}): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({event, data});
      this.socket.send(message);
    } else {
      console.log('WebSocket is not connected');
    }
  }

  public on(event: string, cb: (data: any) => void): void {
    if (this.socket) {
      this.socket.onmessage = message => {
        try {
          const parsedData = JSON.parse(message.data);
          if (parsedData.event === event) {
            cb(parsedData.data);
          }
        } catch (error) {
          console.log('Error parsing WebSocket message:', error);
        }
      };
    }
  }

  public removeListener(): void {
    if (this.socket) {
      this.socket.onmessage = null;
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

const useSocketService = new WSService();

export default useSocketService;
