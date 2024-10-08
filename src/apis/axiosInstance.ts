import axios from 'axios';
import Config from 'react-native-config';

const axiosInstance = axios.create({
  // 안드는 localhost:3000이 안먹힐 수 있기에 10.0.2.2로 테스트
  baseURL: Config.SERVER_URL,
  // Platform.OS === 'android'
  //   ? 'http://10.0.2.2:3030'
  //   : 'http://localhost:3030',
  withCredentials: true,
});

export default axiosInstance;
