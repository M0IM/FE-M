import {keepPreviousData, useQuery} from '@tanstack/react-query';

import {getDetailMoimCalendar} from '../../../apis';
import {UseQueryCustomOptions} from '../../../types/mutations/common.ts';
import {TDetailMoimCalendarDTO} from '../../../types/dtos/calendar.ts';

type TUseGetDetailMoimCalendarProps = {
  moimId: number;
  planId: number;
  queryOptions?: UseQueryCustomOptions<TDetailMoimCalendarDTO>;
};

function useGetDetailMoimCalendar({
  moimId,
  planId,
  queryOptions,
}: TUseGetDetailMoimCalendarProps) {
  return useQuery({
    queryFn: () => getDetailMoimCalendar({moimId, planId}),
    queryKey: ['detailCalendar', moimId, planId],
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

export default useGetDetailMoimCalendar;
