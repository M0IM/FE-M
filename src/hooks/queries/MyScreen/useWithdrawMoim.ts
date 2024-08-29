import {useMutation} from '@tanstack/react-query';

import {withdrawMoim} from 'apis';
import {UseMutationCustomOptions} from 'types/mutations/common.ts';

function useWithdrawMoim(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: withdrawMoim,
    ...mutationOptions,
  });
}

export default useWithdrawMoim;
