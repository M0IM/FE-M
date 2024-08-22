import {
  UseInfiniteQueryOptions,
  InfiniteData,
  QueryKey,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import {getUserAllScheduleList} from 'apis';
import {ResponseError} from 'types/mutations/common.ts';
import {TUserPlanResponse} from 'types/dtos/calendar.ts';

function useGetInfiniteAllUserScheduleList(
  year: number,
  month: number,
  day: number,
  size: number,
  queryOptions?: UseInfiniteQueryOptions<
    TUserPlanResponse,
    ResponseError,
    InfiniteData<TUserPlanResponse, number>,
    TUserPlanResponse,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) =>
      getUserAllScheduleList({year, month, day, page: pageParam, size}),
    queryKey: ['todaySchedules', year, month, day],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages?.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export {useGetInfiniteAllUserScheduleList};
