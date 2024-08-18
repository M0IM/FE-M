import {
  UseInfiniteQueryOptions,
  InfiniteData,
  QueryKey,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import {getMyDetailReview} from 'apis';
import {TMembersReviewDTO} from 'types/dtos/user.ts';
import {ResponseError} from 'types/mutations/common.ts';

function useGetInfiniteMyDetailReviews(
  userId: number,
  queryOptions?: UseInfiniteQueryOptions<
    TMembersReviewDTO[],
    ResponseError,
    InfiniteData<TMembersReviewDTO[], number>,
    TMembersReviewDTO[],
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) => getMyDetailReview(userId, pageParam),
    queryKey: ['review', 'myReviews'],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastReview = lastPage[lastPage.length - 1];
      return lastReview ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export {useGetInfiniteMyDetailReviews};
