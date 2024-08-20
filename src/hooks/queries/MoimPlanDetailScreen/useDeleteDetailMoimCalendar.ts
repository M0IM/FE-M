import {useMutation} from '@tanstack/react-query';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {deleteDetailMoimCalendar} from 'apis';

function useDeleteDetailMoimCalendar(
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: deleteDetailMoimCalendar,
    onError: error => console.log(error),
    ...mutationOptions,
  });
}

export default useDeleteDetailMoimCalendar;
