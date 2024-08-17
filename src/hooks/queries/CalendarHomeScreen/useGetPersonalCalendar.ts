import {keepPreviousData, useQuery} from '@tanstack/react-query';

import {getPersonalCalendar} from 'apis';
import {UseQueryCustomOptions} from 'types/mutations/common.ts';
import {TCalendarPersonalResponse} from 'types/dtos/calendar.ts';

type TUseGetPersonalCalendarProps = {
  year: number;
  month: number;
  queryOptions?: UseQueryCustomOptions<TCalendarPersonalResponse>;
};

function useGetPersonalCalendar({
  year,
  month,
  queryOptions,
}: TUseGetPersonalCalendarProps) {
  return useQuery({
    queryFn: () => getPersonalCalendar({month, year}),
    queryKey: ['myCalendar', month, year],
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

export {useGetPersonalCalendar};
