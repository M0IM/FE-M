import {CommonResponse} from '../mutations/common.ts';

type TMyProfile = {
  userId: number;
  nickname: string;
  imageUrl: string;
};

type TMyProfileResponse = CommonResponse<TMyProfile>;

type TMembersReviewDTO = {
  reviewId: number;
  content: string;
  rating: number;
};

type TUserDTO = {
  userId: number;
  imageUrl: string;
  nickname: string;
  residence: string;
  birth: number;
  createdAt: string;
  rating: number;
  introduction: string;
};

type TUpdateUserParams = {
  nickname: string;
  imageKey: string;
  residence: string;
  introduction: string;
  publicMoimList: number[];
};

export type {
  TMyProfileResponse,
  TMembersReviewDTO,
  TUserDTO,
  TUpdateUserParams,
};
