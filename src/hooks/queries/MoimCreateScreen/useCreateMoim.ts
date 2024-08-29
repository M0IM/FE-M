import {useMutation} from '@tanstack/react-query';
import {createMoim} from 'apis';
import {UseMutationCustomOptions} from 'types/mutations/common';

function useCreateMoim(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createMoim,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
    ...mutationOptions,
  });
}

export default useCreateMoim;
