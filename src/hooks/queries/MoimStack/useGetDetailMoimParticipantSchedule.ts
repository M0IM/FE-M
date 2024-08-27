import {useQuery} from '@tanstack/react-query';
import {getDetailMoimParticipantSchedule} from 'apis';

import {UseQueryCustomOptions} from 'types/mutations/common';
import {TMoimParticipantDetailResponse} from 'types/dtos/calendar.ts';

function useGetDetailMoimParticipantSchedule(
  planId: number,
  queryOptions?: UseQueryCustomOptions<TMoimParticipantDetailResponse>,
) {
  return useQuery({
    queryFn: () => getDetailMoimParticipantSchedule({planId}),
    queryKey: ['detailParticipantSchedule', planId],
    ...queryOptions,
  });
}

export default useGetDetailMoimParticipantSchedule;
