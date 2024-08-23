import axiosInstance from './axiosInstance.ts';
import {ReviewListResponse} from '../types/dtos/review.ts';

// 멤버 후기 리스트 조회
const getMemberReviewList = async ({
  userId,
  page,
  size,
}: {
  userId: number;
  page: number;
  size: number;
}): Promise<ReviewListResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/users/reviews/${userId}?page=${page}&size=${size}`,
  );

  return data.result;
};

// 멤버 후기 작성
const postMemberReview = async ({
  targetUserId,
  rating,
  content,
}: {
  targetUserId: number;
  rating: number;
  content: string;
}) => {
  const {data} = await axiosInstance.post(`/api/v1/users/reviews`, {
    targetUserId,
    rating,
    content,
  });

  return data.result;
};

export {getMemberReviewList, postMemberReview};
