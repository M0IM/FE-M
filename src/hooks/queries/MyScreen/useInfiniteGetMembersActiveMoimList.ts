import {
  UseInfiniteQueryOptions,
  InfiniteData,
  QueryKey,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import {ResponseError} from 'types/mutations/common.ts';
import {TActiveMoimList} from 'types/dtos/moim.ts';
import {getMembersActiveMoimList} from 'apis';

function useInfiniteGetMembersActiveMoimList(
  userId: number,
  size: number,
  queryOptions?: UseInfiniteQueryOptions<
    TActiveMoimList,
    ResponseError,
    InfiniteData<TActiveMoimList, number>,
    TActiveMoimList,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) =>
      getMembersActiveMoimList({userId, cursor: pageParam, take: size}),
    queryKey: ['moim', userId],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

export {useInfiniteGetMembersActiveMoimList};
