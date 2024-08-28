type ReviewDTO = {
  reviewId: number;
  content: string;
  rating: number;
};

type ReviewListResponse = {
  reviewDTOList: ReviewDTO[];
  totalReviewCount: number;
  isFirst: boolean;
  hasNext: boolean;
};

export type {ReviewDTO, ReviewListResponse};
