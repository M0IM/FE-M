import {useQuery} from '@tanstack/react-query';
import {getDetailIndividualSchedule} from 'apis';

import {UseQueryCustomOptions} from 'types/mutations/common';
import {TIndividualResponse} from 'types/dtos/calendar.ts';

function useGetDetailIndividualSchedule(
  planId: number,
  queryOptions?: UseQueryCustomOptions<TIndividualResponse>,
) {
  return useQuery({
    queryFn: () => getDetailIndividualSchedule({planId}),
    queryKey: ['detailIndividualSchedule', planId],
    ...queryOptions,
  });
}

export default useGetDetailIndividualSchedule;
