import {useMutation} from '@tanstack/react-query';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {postDetailMoimCalendar} from 'apis';

function usePostDetailMoimCalendar(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postDetailMoimCalendar,
    onError: error => console.log(error),
    ...mutationOptions,
  });
}

export default usePostDetailMoimCalendar;
