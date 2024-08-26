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
  TUpdateMoimPostParams,
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

// 게시글 삭제
const deleteMoimPost = async ({postId}: {postId: number}): Promise<string> => {
  const {data} = await axiosInstance.delete(`/api/v1/moims/posts/${postId}`);
  return data?.result;
};

// 게시글 신고
const reportMoimPost = async ({
  moimId,
  postId,
}: {
  moimId: number;
  postId: number;
}) => {
  const {data} = await axiosInstance.post(`/api/v1/moims/posts/reports`, {
    moimId,
    postId,
  });
  return data?.result;
};

// 게시글 차단
const blockMoimPost = async ({
  moimId,
  postId,
}: {
  moimId: number;
  postId: number;
}) => {
  const {data} = await axiosInstance.post(`/api/v1/moims/posts/block`, {
    moimId,
    postId,
  });
  return data?.result;
};

// 게시글 수정
const updateMoimPost = async ({
  moimId,
  postId,
  title,
  content,
  imageKeyNames,
}: TUpdateMoimPostParams): Promise<string> => {
  const {data} = await axiosInstance.put(`/api/v1/moims/posts`, {
    moimId,
    postId,
    title,
    content,
    imageKeyNames,
  });
  return data?.result;
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

// 댓글/대댓글 삭제
const deleteMoimPostComment = async ({
  commentId,
}: {
  commentId: number;
}): Promise<string> => {
  const {data} = await axiosInstance.post(
    `/api/v1/moims/comments/${commentId}/delete`,
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
  deleteMoimPost,
  reportMoimPost,
  blockMoimPost,
  updateMoimPost,
};
