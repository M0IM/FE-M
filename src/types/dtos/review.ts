type ReviewDTO = {
  reviewId: number;
  content: string;
  rating: number;
};

type ReviewListResponse = {
  reviewDTOList: ReviewDTO[];
  totalReviewCount: number;
  isFirst: boolean;
  hanNext: boolean;
};

export type {ReviewDTO, ReviewListResponse};
