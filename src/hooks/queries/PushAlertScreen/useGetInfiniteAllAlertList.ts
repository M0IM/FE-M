import {
  UseInfiniteQueryOptions,
  InfiniteData,
  QueryKey,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import {getAlertList} from 'apis';
import {ResponseError} from 'types/mutations/common.ts';
import {TAlarmResponse} from 'types/dtos/alert.ts';

function useGetInfiniteAllAlertList(
  take: number,
  queryOptions?: UseInfiniteQueryOptions<
    TAlarmResponse,
    ResponseError,
    InfiniteData<TAlarmResponse, number>,
    TAlarmResponse,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) => getAlertList({cursor: pageParam, take}),
    queryKey: ['alert'],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

export {useGetInfiniteAllAlertList};
