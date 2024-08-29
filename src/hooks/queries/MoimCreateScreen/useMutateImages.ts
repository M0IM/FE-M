import {useMutation} from '@tanstack/react-query';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {uploadImages} from 'apis/image.ts';

function useMutateImages(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: uploadImages,
    ...mutationOptions,
  });
}

export default useMutateImages;
