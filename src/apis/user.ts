import axiosInstance from './axiosInstance.ts';
import {TMyProfileResponse} from '../types/dtos/user.ts';

const getUserProfile = async (): Promise<TMyProfileResponse> => {
  const {data} = await axiosInstance.get('/api/v1/users/profile');

  return data;
};

export {getUserProfile};
