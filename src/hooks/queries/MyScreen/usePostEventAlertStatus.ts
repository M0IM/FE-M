import {useMutation} from '@tanstack/react-query';

import {postEventAlertStatus} from 'apis';
import {UseMutationCustomOptions} from 'types/mutations/common.ts';

function usePostEventAlertStatus(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postEventAlertStatus,
    ...mutationOptions,
  });
}

export default usePostEventAlertStatus;
