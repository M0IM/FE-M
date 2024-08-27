import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import {getSearchRegion} from 'apis';
import {ResponseError} from 'types/mutations/common';
import {RegionSearchResponse} from 'types/dtos/region.ts';

function useGetInfinityRegion(
  searchTerm: string,
  queryOptions?: UseInfiniteQueryOptions<
    RegionSearchResponse,
    ResponseError,
    InfiniteData<RegionSearchResponse, number>,
    RegionSearchResponse,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) =>
      getSearchRegion({
        searchTerm,
        cursor: pageParam,
        take: 10,
      }),
    queryKey: ['region', searchTerm],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinityRegion;
