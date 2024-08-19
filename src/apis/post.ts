import {
  TMoimPostCommentParams,
  TMoimPostCommentsParams,
  TMoimPostDetailParams,
  TMoimPostListParams,
  TMoimPostParams,
  TMoimPostRecommentParams,
  TPostCommentListDto,
  TPostDetailDto,
  TPostDto,
  TPostListDto,
  TReportMoimPostCommentParams,
} from 'types/dtos/post';
import axiosInstance from './axiosInstance';

// 게시글 작성
const writeMoimPost = async ({
  moimId,
  title,
  content,
  imageKeyNames,
  postType,
}: TMoimPostParams): Promise<TPostDto> => {
  const {data} = await axiosInstance.post('/api/v1/moims/posts', {
    moimId,
    title,
    content,
    imageKeyNames,
    postType,
  });
  console.log(data);
  return data;
};

// 게시글 좋아요
const likeMoimPost = async ({postId}: {postId: number}) => {
  const {data} = await axiosInstance.post('/api/v1/moims/posts/like', {
    postId,
  });
  console.log(data);
  return data;
};

// 게시글 댓글 작성
const writeMoimPostComment = async ({
  moimId,
  postId,
  content,
}: TMoimPostCommentParams): Promise<TPostDto> => {
  const {data} = await axiosInstance.post('/api/v1/moims/posts/comments', {
    moimId,
    postId,
    content,
  });
  console.log(data);
  return data;
};

// 게시글 대댓글 작성
const writeMoimPostRecomment = async ({
  moimId,
  commentId,
  postId,
  content,
}: TMoimPostRecommentParams): Promise<TPostDto> => {
  const {data} = await axiosInstance.post(
    '/api/v1/moims/posts/comments/comments',
    {
      moimId,
      commentId,
      postId,
      content,
    },
  );
  return data?.result;
};

// 게시글 댓글/대댓글 좋아요
const likeMoimPostComment = async ({commentId}: {commentId: number}) => {
  const {data} = await axiosInstance.post('/api/v1/moims/comments/Like', {
    commentId,
  });
  console.log(data);
  return data;
};

// 게시글 리스트 가져오기
const getMoimPostList = async ({
  moimId,
  postType,
  cursor,
  take,
}: TMoimPostListParams): Promise<TPostListDto> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/${moimId}/posts?postType=${postType}&cursor=${cursor}&take=${take}`,
  );
  return data?.result;
};

// 게시글 상세 데이터 가져오기
const getMoimPostDetail = async ({
  moimId,
  postId,
}: TMoimPostDetailParams): Promise<TPostDetailDto> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/${moimId}/posts/${postId}`,
  );
  return data?.result;
};

// 게시글 댓글/대댓글 리스트 가져오기
const getMoimPostComments = async ({
  moimId,
  postId,
  cursor,
  take,
}: TMoimPostCommentsParams): Promise<TPostCommentListDto> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/${moimId}/posts/${postId}/comments?cursor=${cursor}&take=${take}`,
  );
  return data.result;
};

// TODO: 댓글/대댓글 삭제 API 수정 필요
const deleteMoimPostComment = async ({
  commentId,
}: {
  commentId: number;
}): Promise<string> => {
  const {data} = await axiosInstance.delete(
    `/api/v1/moims/comments/${commentId}`,
  );
  return data?.result;
};

// 댓글/대댓글 신고하기
const reportMoimPostComment = async ({
  moimId,
  postId,
  commentId,
}: TReportMoimPostCommentParams): Promise<string> => {
  const {data} = await axiosInstance.post(`/api/v1/moims/comments/reports`, {
    moimId,
    postId,
    commentId,
  });
  return data?.result;
};

// 댓글/대댓글 차단하기
const blockMoimPostComment = async ({
  moimId,
  postId,
  commentId,
}: TReportMoimPostCommentParams): Promise<string> => {
  const {data} = await axiosInstance.post(`/api/v1/moims/comments/block`, {
    moimId,
    postId,
    commentId,
  });
  return data?.result;
};

export {
  writeMoimPost,
  likeMoimPost,
  writeMoimPostComment,
  writeMoimPostRecomment,
  likeMoimPostComment,
  getMoimPostList,
  getMoimPostDetail,
  getMoimPostComments,
  deleteMoimPostComment,
  reportMoimPostComment,
  blockMoimPostComment,
};
