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

const likeMoimPost = async ({postId}: {postId: number}) => {
  const {data} = await axiosInstance.post('/api/v1/moims/posts/like', {
    postId,
  });
  console.log(data);
  return data;
};

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

const likeMoimPostComment = async ({commentId}: {commentId: number}) => {
  const {data} = await axiosInstance.post('/api/v1/moims/comments/Like', {
    commentId,
  });
  console.log(data);
  return data;
};

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

const getMoimPostDetail = async ({
  moimId,
  postId,
}: TMoimPostDetailParams): Promise<TPostDetailDto> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/${moimId}/posts/${postId}`,
  );
  return data?.result;
};

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

// TODO: 댓글 삭제 API 수정 필요
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
};
