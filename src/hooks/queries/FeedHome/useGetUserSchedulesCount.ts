import {keepPreviousData, useQuery} from '@tanstack/react-query';

import {getUserSchedulesCount} from 'apis';
import {UseQueryCustomOptions} from 'types/mutations/common.ts';
import {TUserSchedulesCountResponse} from 'types/dtos/calendar.ts';

type TUseGetUserSchedulesCountProps = {
  year: number;
  month: number;
  day: number;
  queryOptions?: UseQueryCustomOptions<TUserSchedulesCountResponse>;
};

function useGetUserSchedulesCount({
  year,
  month,
  day,
  queryOptions,
}: TUseGetUserSchedulesCountProps) {
  return useQuery({
    queryFn: () => getUserSchedulesCount({year, month, day}),
    queryKey: ['myScheduleCount', year, month, day],
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

export {useGetUserSchedulesCount};
