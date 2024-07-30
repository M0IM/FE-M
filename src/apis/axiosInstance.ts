import axios from 'axios';
// import {Platform} from 'react-native';

const axiosInstance = axios.create({
  // 안드는 localhost:3000이 안먹힐 수 있기에 10.0.2.2로 테스트
  baseURL: 'http://54.180.46.6',
  // Platform.OS === 'android'
  //   ? 'http://10.0.2.2:3030'
  //   : 'http://localhost:3030',
  withCredentials: true,
});

export default axiosInstance;
