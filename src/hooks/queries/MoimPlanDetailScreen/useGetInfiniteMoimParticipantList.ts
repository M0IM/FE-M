import {
  UseInfiniteQueryOptions,
  InfiniteData,
  QueryKey,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import {getDetailMoimParticipantsList} from 'apis';
import {TMoimParticipantList} from '../../../types/dtos/moim.ts';
import {ResponseError} from '../../../types/mutations/common.ts';

function useGetInfiniteMoimParticipantList(
  moimId: number,
  planId: number,
  queryOptions?: UseInfiniteQueryOptions<
    TMoimParticipantList[],
    ResponseError,
    InfiniteData<TMoimParticipantList[], number>,
    TMoimParticipantList[],
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) =>
      getDetailMoimParticipantsList({moimId, planId, page: pageParam}),
    queryKey: ['participantList', moimId, planId],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastMember = lastPage[lastPage?.length - 1];
      return lastMember ? allPages?.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export {useGetInfiniteMoimParticipantList};
