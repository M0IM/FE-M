import {useMutation} from '@tanstack/react-query';

import {updateMyCalendarSchedule} from 'apis';
import {UseMutationCustomOptions} from 'types/mutations/common.ts';

function useUpdateMyCalendarSchedule(
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: updateMyCalendarSchedule,
    ...mutationOptions,
  });
}

export default useUpdateMyCalendarSchedule;
