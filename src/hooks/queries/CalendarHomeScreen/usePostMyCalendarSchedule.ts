import {useMutation} from '@tanstack/react-query';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {postMyCalendarScheule} from 'apis';

function usePostMyCalendarSchedule(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postMyCalendarScheule,
    ...mutationOptions,
    onError: error => console.log(error),
  });
}

export default usePostMyCalendarSchedule;
