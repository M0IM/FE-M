import {useMutation} from '@tanstack/react-query';
import {createPresignedURL} from 'apis';
import {UseMutationCustomOptions} from 'types/mutations/common.ts';

function useCreatePresignedURL(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPresignedURL,
    ...mutationOptions,
  });
}

export default useCreatePresignedURL;
