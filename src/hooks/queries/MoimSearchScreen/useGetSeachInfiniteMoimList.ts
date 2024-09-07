import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import {getSearchMoimList} from 'apis/search.ts';
import {TMoimSearchResultDTO} from 'types/dtos/moim.ts';
import {ResponseError} from 'types/mutations/common.ts';
import {MOIM_REQUEST_TYPE} from 'types/enums';

function useGetSearchInfiniteMoimList(
  name: string,
  moimRequestType: MOIM_REQUEST_TYPE[] | null,
  queryOptions?: UseInfiniteQueryOptions<
    TMoimSearchResultDTO,
    ResponseError,
    InfiniteData<TMoimSearchResultDTO, number>,
    TMoimSearchResultDTO,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) =>
      getSearchMoimList(pageParam, moimRequestType, name),
    queryKey: ['searchMoim', name, moimRequestType],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    staleTime: 3000,
    ...queryOptions,
  });
}

export {useGetSearchInfiniteMoimList};
