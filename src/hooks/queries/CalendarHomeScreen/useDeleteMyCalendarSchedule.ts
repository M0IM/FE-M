import {useMutation} from '@tanstack/react-query';

import {deleteMyCalendarSchedule} from 'apis';
import {UseMutationCustomOptions} from 'types/mutations/common.ts';

function useDeleteMyCalendarSchedule(
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: deleteMyCalendarSchedule,
    ...mutationOptions,
  });
}

export default useDeleteMyCalendarSchedule;
