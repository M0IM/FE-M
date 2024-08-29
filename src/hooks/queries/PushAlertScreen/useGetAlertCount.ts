import {useQuery} from '@tanstack/react-query';
import {getAlertCount} from 'apis';

import {UseQueryCustomOptions} from 'types/mutations/common';
import {TAlarmCountResponse} from 'types/dtos/alert.ts';

function useGetAlertCount(
  queryOptions?: UseQueryCustomOptions<TAlarmCountResponse>,
) {
  return useQuery({
    queryFn: getAlertCount,
    queryKey: ['alertCount'],
    ...queryOptions,
  });
}

export default useGetAlertCount;
