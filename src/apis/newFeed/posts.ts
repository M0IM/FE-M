import axiosInstance from '../axiosInstance.ts';
import {TMoimIntroduceListResponse} from '../../types/dtos/moim.ts';

/**
 * @docs 모임 소개 개시물 조회 API
 * @param cursor
 * @param take
 */
const getMoimIntroducePosts = async ({
  cursor,
  take,
}: {
  cursor: number;
  take: number;
}): Promise<TMoimIntroduceListResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/global/posts?cursor=${cursor}&take=${take}`,
  );

  return data.result;
};

/**
 * @docs 모임 소개 게시물 상세 조회 API
 * @param postId
 */
const getDetailMoimIntroducePost = async ({postId}: {postId: number}) => {
  const {data} = await axiosInstance.get(`/api/v1/global/posts/${postId}`);

  return data.result;
};

/**
 * @docs 모임 게시글 삭제 API
 * @param postId
 */
const deleteMoimIntroducePost = async ({postId}: {postId: number}) => {
  const {data} = await axiosInstance.delete(`/api/v1/global/posts/${postId}`);

  return data.result;
};

export {
  getMoimIntroducePosts,
  getDetailMoimIntroducePost,
  deleteMoimIntroducePost,
};
