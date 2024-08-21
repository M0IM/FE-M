import {useMutation} from '@tanstack/react-query';
import {requestMoimJoin} from 'apis';
import {UseMutationCustomOptions} from 'types/mutations/common';

function useRequestMoimJoin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: requestMoimJoin,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
    ...mutationOptions,
  });
}

export default useRequestMoimJoin;
