import axiosInstance from './axiosInstance.ts';
import {
  TMembersReviewDetailResponse,
  TMembersReviewDTO,
  TMyProfileResponse,
} from '../types/dtos/user.ts';

const getUserProfile = async (): Promise<TMyProfileResponse> => {
  const {data} = await axiosInstance.get('/api/v1/users/profile');

  return data;
};

const getMyDetailReview = async (page = 1): Promise<TMembersReviewDTO[]> => {
  const {data} = await axiosInstance.get(
    `/api/v1/users/profile/reviews?page=${page}&size=5`,
  );

  return data.result.reviewDTOList;
};

export {getUserProfile, getMyDetailReview};
