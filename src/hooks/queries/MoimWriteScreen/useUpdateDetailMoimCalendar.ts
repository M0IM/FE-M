import {useMutation} from '@tanstack/react-query';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {updateDetailMoimCalendar} from 'apis';

function useUpdateDetailMoimCalendar(
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: updateDetailMoimCalendar,
    onError: error => console.log(error),
    ...mutationOptions,
  });
}

export default useUpdateDetailMoimCalendar;
