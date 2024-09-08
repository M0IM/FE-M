import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import {getMyActiveMoim} from 'apis';
import {TGetMyActiveMoimResponse} from 'types/dtos/moim.ts';
import {TMoimRoleCategory} from 'types/dtos/moimManage';
import {ResponseError} from 'types/mutations/common.ts';

function useGetInfiniteMyActiveMoim(
  moimRequestRole: TMoimRoleCategory,
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
    queryFn: ({pageParam}) =>
      getMyActiveMoim({cursor: pageParam, moimRequestRole: moimRequestRole}),
    queryKey: ['myMoim'],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}
export {useGetInfiniteMyActiveMoim};
