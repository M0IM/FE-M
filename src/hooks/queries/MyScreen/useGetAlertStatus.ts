import {keepPreviousData, useQuery} from '@tanstack/react-query';

import {getAlertStatus} from 'apis';

function useGetDetailMoimCalendar() {
  return useQuery({
    queryFn: getAlertStatus,
    queryKey: ['alertStatus'],
    placeholderData: keepPreviousData,
  });
}

export default useGetDetailMoimCalendar;
