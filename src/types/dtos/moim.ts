import {MOIM_REQUEST_TYPE} from 'types/enums';
import {TMoimRole} from './moimManage';
import {POST_LIST_TYPE} from './post.ts';

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

type TMoimSpaceInfoDTO = {
  moimId: number;
  isJoin: boolean;
  title: string;
  description: string;
  profileImageUrl: string;
  category: MOIM_CATEGORY;
  averageAge: number;
  diaryCount: number;
  moimReviewCount: number;
  maleCount: number;
  femaleCount: number;
  address: string;
  createAt: string;
  updateAt: string;
};

export type TUserPreviewDTO = {
  userId: number;
  nickname: string;
  imageKeyName: string;
  moimRole: TMoimRole;
};

type TMoimMembersDTO = {
  userPreviewDTOList: TUserPreviewDTO[];
  hasNext: boolean;
  nextCursor: number;
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

type TWithdrawMoimResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
};

type TMoimPreviewListDTO = {
  moimPostId: number;
  title: string;
  content: string;
  profileImage: string;
  writer: string;
  commentCount: number;
  likeCount: number;
  postType: POST_LIST_TYPE;
  createAt: string;
};

type TMoimPreviewListResponse = {
  moimPreviewList: TMoimPreviewListDTO[];
  nextCursor: number;
  hasNext: boolean;
};

export type {
  TMoimDTOResponse,
  TGetMyActiveMoimResponse,
  TMoimParticipantList,
  TMoimSearchResultDTO,
  TCreateMoimResponse,
  TMoimSpaceInfoDTO,
  TMoimMembersDTO,
  TCreateMoimParams,
  TWithdrawMoimResponse,
  TMoimPreviewListResponse,
};
