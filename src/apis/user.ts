import axiosInstance from './axiosInstance.ts';
import {
  TMembersReviewDTO,
  TMyProfileResponse,
  TUserDTO,
} from '../types/dtos/user.ts';

const getUserProfile = async (): Promise<TMyProfileResponse> => {
  const {data} = await axiosInstance.get('/api/v1/users/profile');

  return data;
};

const getMyDetailReview = async (
  userId: number,
  page = 1,
): Promise<TMembersReviewDTO[]> => {
  const {data} = await axiosInstance.get(
    `/api/v1/users/profile/reviews/${userId}?page=${page}&size=5`,
  );

  return data.result.reviewDTOList;
};

const getUserDetailProfile = async (userId: number): Promise<TUserDTO> => {
  const {data} = await axiosInstance.get(`/api/v1/users/profile/${userId}`);

  return data.result;
};

export {getUserProfile, getMyDetailReview, getUserDetailProfile};
