import {CommonResponse} from '../mutations/common.ts';

type TMyProfile = {
  userId: number;
  nickname: string;
  imageUrl: string;
};

type TMyProfileResponse = CommonResponse<TMyProfile>;

export type {TMyProfileResponse};
