import {useMutation} from '@tanstack/react-query';

import {postPushAlertStatus} from 'apis';
import {UseMutationCustomOptions} from 'types/mutations/common.ts';

function usePostPushAlertStatus(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postPushAlertStatus,
    ...mutationOptions,
  });
}

export default usePostPushAlertStatus;
