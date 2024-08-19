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

type TPostDto = {
  moimPostId: number;
  createAt: string;
  updateAt: string;
};

type TMoimPreviewListDto = {
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
};

export type TPostCommentDto = {
  commentId: number;
  content: string;
  likeCount: number;
  profileImage: string;
  writer: string;
  isLike: boolean;
  updateAt: string;
  createAt: string;
  commentResponseDTOList: TPostRecommentDto[];
};

type TPostCommentListDto = {
  moimPreviewList: TPostCommentDto[];
  nextCursor: number;
  hasNext: boolean;
};

type TMoimPostParams = {
  moimId: number;
  title: string;
  content: string;
  imageKeyNames: string[];
  postType: POST_TYPE;
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

export type {
  TMoimPostParams,
  TMoimPostCommentParams,
  TMoimPostRecommentParams,
  TMoimPostListParams,
  TMoimPostDetailParams,
  TMoimPostCommentsParams,
  TReportMoimPostCommentParams,
  TPostDto,
  TPostListDto,
  TPostDetailDto,
  TPostCommentListDto,
  TMoimPreviewListDto,
};
