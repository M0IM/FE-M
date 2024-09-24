import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import {ResponseError} from 'types/mutations/common';
import {getMoimIntroducePosts} from 'apis/newFeed/posts.ts';
import {TMoimIntroduceListResponse} from '../../../types/dtos/moim.ts';

function useGetInfinityMoimIntroducePosts(
  take: number,
  queryOptions?: UseInfiniteQueryOptions<
    TMoimIntroduceListResponse,
    ResponseError,
    InfiniteData<TMoimIntroduceListResponse, number>,
    TMoimIntroduceListResponse,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) =>
      getMoimIntroducePosts({
        cursor: pageParam,
        take,
      }),
    queryKey: ['randomPosts'],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinityMoimIntroducePosts;
