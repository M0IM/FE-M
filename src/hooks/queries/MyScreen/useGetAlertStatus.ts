import {keepPreviousData, useQuery} from '@tanstack/react-query';

import {getAlertStatus} from 'apis';

function useGetAlertStatus() {
  return useQuery({
    queryFn: getAlertStatus,
    queryKey: ['alertStatus'],
    placeholderData: keepPreviousData,
  });
}

export default useGetAlertStatus;
