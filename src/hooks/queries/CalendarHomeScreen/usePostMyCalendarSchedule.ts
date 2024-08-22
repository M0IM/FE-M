import {useMutation} from '@tanstack/react-query';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {postMyCalendarSchedule} from 'apis';

function usePostMyCalendarSchedule(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postMyCalendarSchedule,
    ...mutationOptions,
    onError: error => console.log(error),
  });
}

export default usePostMyCalendarSchedule;
