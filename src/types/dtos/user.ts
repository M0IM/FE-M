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

type TMembersReviewDetail = {
  reviewDTOList: TMembersReviewDTO[];
  totalReviewCnt: number;
};

type TMembersReviewDetailResponse = CommonResponse<TMembersReviewDetail>;

export type {
  TMyProfileResponse,
  TMembersReviewDetail,
  TMembersReviewDTO,
  TMembersReviewDetailResponse,
};
