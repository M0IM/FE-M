import {keepPreviousData, useQuery} from '@tanstack/react-query';

import {getMoimCalendar} from 'apis';
import {UseQueryCustomOptions} from 'types/mutations/common.ts';
import {TCalendarMoimResponse} from 'types/dtos/calendar.ts';

type TUseGetMoimCalendarProps = {
  moimId: number;
  month: number;
  year: number;
  queryOptions?: UseQueryCustomOptions<TCalendarMoimResponse>;
};

function useGetMoimCalendar({
  moimId,
  month,
  year,
  queryOptions,
}: TUseGetMoimCalendarProps) {
  return useQuery({
    queryFn: () => getMoimCalendar({moimId, month, year}),
    queryKey: ['moimCalendar', moimId, month, year],
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

export {useGetMoimCalendar};
