import {COMMENT_STATUS} from 'types/enums';
import {TMoimRole} from './moimManage';

export enum POST_TYPE {
  ANNOUNCEMENT = '공지사항',
  REVIEW = '활동 후기',
  WELCOME = '가입 인사',
  FREE = '자유',
}

export type POST_LIST_TYPE =
  | 'ALL'
  | 'ANNOUNCEMENT'
  | 'REVIEW'
  | 'WELCOME'
  | 'FREE';

export type COMMENT_STATUS_TYPE =
  | COMMENT_STATUS.ACTIVE
  | COMMENT_STATUS.DELETED;

type TPostDto = {
  moimPostId: number;
  createAt: string;
  updateAt: string;
};

type TMoimPreviewListDto = {
  moimPostId: number;
  moimId: number;
  title: string;
  content: string;
  moimImageUrl: string[];
  ownerProfileImageUrl: string;
  writer: string;
  commentCount: number;
  likeCount: number;
  postType: POST_LIST_TYPE;
  createAt: string;
  writerId: number;
};

type TPostListDto = {
  moimPreviewList: TMoimPreviewListDto[];
  nextCursor: number;
  hasNext: boolean;
};

type TPostDetailDto = {
  moimPostId: number;
  title: string;
  content: string;
  profileImage: string;
  writer: string;
  commentCount: number;
  likeCount: number;
  isLike: boolean;
  imageKeyNames: string[];
  updateAt: string;
  createAt: string;
  writerId: number;
  postType: POST_LIST_TYPE;
};

export type TPostRecommentDto = {
  commentId: number;
  content: string;
  likeCount: number;
  profileImage: string;
  writer: string;
  isLike: boolean;
  updateAt: string;
  createAt: string;
  commentStatus: COMMENT_STATUS_TYPE;
  writerId: number;
};

export type TPostCommentDto = {
  commentId: number;
  content: string;
  likeCount: number;
  profileImage: string;
  writer: string;
  writerId: number;
  isLike: boolean;
  updateAt: string;
  createAt: string;
  commentResponseDTOList: TPostRecommentDto[];
  commentStatus: COMMENT_STATUS_TYPE;
};

type TPostCommentListDto = {
  moimPreviewList: TPostCommentDto[];
  nextCursor: number;
  hasNext: boolean;
};

type TUnReadUserDTO = {
  userId: number;
  nickname: string;
  imageKeyName: string;
  moimRole: TMoimRole;
};

type TMoimPostParams = {
  moimId: number;
  title: string;
  content: string;
  imageKeyNames: string[];
  postType: string;
};

type TMoimPostCommentParams = {
  moimId: number;
  postId: number;
  content: string;
};

type TMoimPostRecommentParams = {
  moimId: number;
  commentId: number;
  postId: number;
  content: string;
};

type TMoimPostListParams = {
  moimId: number;
  postType: POST_LIST_TYPE;
  cursor: number;
  take: number;
};

type TMoimPostDetailParams = {
  moimId: number;
  postId: number;
};

type TMoimPostCommentsParams = {
  moimId: number;
  postId: number;
  cursor: number;
  take: number;
};

type TReportMoimPostCommentParams = {
  moimId: number;
  postId: number;
  commentId: number;
};

type TUpdateMoimPostParams = {
  moimId: number;
  postId: number;
  title: string;
  content: string;
  imageKeyNames: string[];
};

type TCreateAnnouncementPostParams = {
  moimId: number;
  title: string;
  content: string;
  imageKeyNames: string[];
  userIds: number[];
  isAllUserSelected: boolean;
};

export type {
  TMoimPostParams,
  TMoimPostCommentParams,
  TMoimPostRecommentParams,
  TMoimPostListParams,
  TMoimPostDetailParams,
  TMoimPostCommentsParams,
  TReportMoimPostCommentParams,
  TUpdateMoimPostParams,
  TCreateAnnouncementPostParams,
  TPostDto,
  TPostListDto,
  TPostDetailDto,
  TPostCommentListDto,
  TMoimPreviewListDto,
  TUnReadUserDTO,
};
