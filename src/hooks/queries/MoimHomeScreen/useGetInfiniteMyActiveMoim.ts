import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import {getMyActiveMoim} from 'apis';
import {TGetMyActiveMoimResponse} from 'types/dtos/moim.ts';
import {ResponseError} from 'types/mutations/common.ts';

function useGetInfiniteMyActiveMoim(
  queryOptions?: UseInfiniteQueryOptions<
    TGetMyActiveMoimResponse,
    ResponseError,
    InfiniteData<TGetMyActiveMoimResponse, number>,
    TGetMyActiveMoimResponse,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) => getMyActiveMoim(pageParam),
    queryKey: ['myMoim'],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}
export {useGetInfiniteMyActiveMoim};
