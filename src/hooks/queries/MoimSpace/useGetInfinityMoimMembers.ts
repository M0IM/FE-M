import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {getMoimMembers} from 'apis';
import {TMoimMembersDTO} from 'types/dtos/moim';
import {ResponseError} from 'types/mutations/common';

function useGetInfinityMoimMembers(
  moimId: number,
  search: string,
  queryOptions?: UseInfiniteQueryOptions<
    TMoimMembersDTO,
    ResponseError,
    InfiniteData<TMoimMembersDTO, number>,
    TMoimMembersDTO,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) =>
      getMoimMembers({
        moimId,
        cursor: pageParam,
        take: 10,
        search,
      }),
    queryKey: ['moimMembers', moimId, search],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinityMoimMembers;
