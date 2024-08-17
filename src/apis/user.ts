import axiosInstance from './axiosInstance.ts';
import {
  TMembersReviewDTO,
  TMyProfileResponse,
  TUpdateUserParams,
  TUserDTO,
} from 'types/dtos/user.ts';

const getUserProfile = async (): Promise<TMyProfileResponse> => {
  const {data} = await axiosInstance.get('/api/v1/users/profile');
  console.log(data);
  return data;
};

const getMyDetailReview = async (
  userId: number,
  page = 1,
): Promise<TMembersReviewDTO[]> => {
  const {data} = await axiosInstance.get(
    `/api/v1/users/reviews/${userId}?page=${page}&size=5`,
  );

  return data.result.reviewDTOList;
};

const getUserDetailProfile = async (userId: number): Promise<TUserDTO> => {
  const {data} = await axiosInstance.get(
    `/api/v1/users/profile/detail/${userId}`,
  );

  return data.result;
};

const updateMyProfile = async ({
  nickname,
  imageKey,
  residence,
  introduction,
  publicMoimList,
}: TUpdateUserParams) => {
  const {data} = await axiosInstance.put(`/api/v1/users/profile`, {
    nickname,
    imageKey,
    residence,
    introduction,
    publicMoimList,
  });

  return data.result;
};

export {
  getUserProfile,
  getMyDetailReview,
  getUserDetailProfile,
  updateMyProfile,
};
