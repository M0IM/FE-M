import {
  UseInfiniteQueryOptions,
  InfiniteData,
  QueryKey,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import {ResponseError} from 'types/mutations/common.ts';
import {ReviewListResponse} from 'types/dtos/review.ts';
import {getMemberReviewList} from 'apis/review.ts';

function useGetInfiniteMemberReviewList(
  userId: number,
  size: number,
  queryOptions?: UseInfiniteQueryOptions<
    ReviewListResponse,
    ResponseError,
    InfiniteData<ReviewListResponse, number>,
    ReviewListResponse,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) =>
      getMemberReviewList({userId, page: pageParam, size}),
    queryKey: ['review', 'myReviews', userId],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hanNext ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export {useGetInfiniteMemberReviewList};
