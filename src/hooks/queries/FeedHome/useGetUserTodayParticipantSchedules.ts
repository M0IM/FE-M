import {
  UseInfiniteQueryOptions,
  InfiniteData,
  QueryKey,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import {getUserTodayParticipantSchedules} from 'apis';
import {ResponseError} from 'types/mutations/common.ts';
import {TUserPlanDTO} from 'types/dtos/calendar.ts';

function useGetUserTodayParticipantSchedules(
  year: number,
  month: number,
  day: number,
  queryOptions?: UseInfiniteQueryOptions<
    TUserPlanDTO[],
    ResponseError,
    InfiniteData<TUserPlanDTO[], number>,
    TUserPlanDTO[],
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) =>
      getUserTodayParticipantSchedules({year, month, day, page: pageParam}),
    queryKey: ['todaySchedules', year, month, day],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastMember = lastPage[lastPage?.length - 1];
      return lastMember ? allPages?.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export {useGetUserTodayParticipantSchedules};
