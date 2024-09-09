import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import {getMoimJoinRequest} from 'apis';
import {
  JOIN_STATUS_REQUEST,
  TGetMoimJoinRequestResponse,
} from 'types/dtos/user';
import {ResponseError} from 'types/mutations/common';

function useGetInfiniteMoimJoinRequest(
  moimRequestJoin: JOIN_STATUS_REQUEST,
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
        moimRequestJoin,
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
