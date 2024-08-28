import {USER_PROVIDER} from 'types/enums/index.ts';
import {CommonResponse} from '../mutations/common.ts';
import {JOIN_STATUS, MOIM_CATEGORY} from './moim.ts';

type TMyProfile = {
  userId: number;
  nickname: string;
  imageUrl: string;
  provider:
    | USER_PROVIDER.APPLE
    | USER_PROVIDER.GOOGLE
    | USER_PROVIDER.KAKAO
    | USER_PROVIDER.LOCAL
    | USER_PROVIDER.NAVER
    | USER_PROVIDER.UNREGISTERED;
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
  participateMoimCnt: number;
};

export type TMoimJoinRequestDTOList = {
  userMoim: number;
  moimId: number;
  title: string;
  description: string;
  moimCategory: MOIM_CATEGORY;
  location: string;
  userCounts: number;
  joinStatus: JOIN_STATUS;
  imageUrl: string;
};

type TGetMoimJoinRequestResponse = {
  moimJoinRequestDTOList: TMoimJoinRequestDTOList[];
  hasNext: boolean;
  nextCursor: number;
};

type TUpdateUserParams = {
  nickname: string;
  imageKey: string;
  residence: string;
  introduction: string;
  publicMoimList: number[];
};

type TGetMoimJoinRequestParams = {
  cursor: number;
  take: number;
};

export type {
  TMyProfileResponse,
  TMembersReviewDTO,
  TUserDTO,
  TGetMoimJoinRequestResponse,
  TUpdateUserParams,
  TGetMoimJoinRequestParams,
};
