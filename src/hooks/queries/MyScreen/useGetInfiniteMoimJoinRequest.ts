import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import {getMoimJoinRequest} from 'apis';
import {TGetMoimJoinRequestResponse} from 'types/dtos/user';
import {ResponseError} from 'types/mutations/common';

function useGetInfiniteMoimJoinRequest(
  queryOptions?: UseInfiniteQueryOptions<
    TGetMoimJoinRequestResponse,
    ResponseError,
    InfiniteData<TGetMoimJoinRequestResponse, number>,
    TGetMoimJoinRequestResponse,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) =>
      getMoimJoinRequest({
        cursor: pageParam,
        take: 10,
      }),
    queryKey: ['moimJoinRequests'],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

export {useGetInfiniteMoimJoinRequest};
