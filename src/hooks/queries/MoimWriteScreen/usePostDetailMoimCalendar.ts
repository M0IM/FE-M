import {useMutation} from '@tanstack/react-query';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {postDetailMoimCalendar} from 'apis';

function usePostDetailMoimCalendar(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postDetailMoimCalendar,
    ...mutationOptions,
    onError: error => console.log(error),
  });
}

export default usePostDetailMoimCalendar;
