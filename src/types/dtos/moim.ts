import {MOIM_REQUEST_TYPE} from 'types/enums';

export type MOIM_CATEGORY =
  | MOIM_REQUEST_TYPE.ALL
  | MOIM_REQUEST_TYPE.SELF
  | MOIM_REQUEST_TYPE.MUSIC
  | MOIM_REQUEST_TYPE.ANIMAL
  | MOIM_REQUEST_TYPE.PHOTO
  | MOIM_REQUEST_TYPE.RELIGION
  | MOIM_REQUEST_TYPE.VOLUNTEER
  | MOIM_REQUEST_TYPE.ARTICLE
  | MOIM_REQUEST_TYPE.LANGUAGE
  | MOIM_REQUEST_TYPE.HUMANITY
  | MOIM_REQUEST_TYPE.TECH
  | MOIM_REQUEST_TYPE.SPORTS;

type TMoimDTOResponse = {
  moimId: number;
  title: string;
  description: string;
  category: string;
  address: string;
  profileImageUrl: string;
  memberCount: number;
  createdAt: Date;
  updateAt: Date;
};

type TGetMyActiveMoimResponse = {
  moimPreviewList: TMoimDTOResponse[];
  nextCursor: number;
  hasNext: boolean;
};

type TMoimParticipantList = {
  userId: number;
  nickname: string;
  imageUrl: string;
};

type TMoimSearchResultDTO = {
  moimPreviewList: TMoimDTOResponse[];
  nextCursor: number;
  hasNext: boolean;
};

type TCreateMoimResponse = {
  moimId: number;
  createAt: string;
  updateAt: string;
};

type TCreateMoimParams = {
  title: string;
  location: string;
  moimCategory: MOIM_CATEGORY;
  imageKeyName?: string;
  introduceVideoKeyName?: string;
  introduceVideoTitle?: string;
  introduction: string;
};

export type {
  TMoimDTOResponse,
  TGetMyActiveMoimResponse,
  TMoimParticipantList,
  TMoimSearchResultDTO,
  TCreateMoimResponse,
  TCreateMoimParams,
};
