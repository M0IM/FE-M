import {useMutation} from '@tanstack/react-query';
import {updateMyProfile} from 'apis';
import {UseMutationCustomOptions} from '../../../types/mutations/common.ts';

function useUpdateMyProfile(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateMyProfile,
    ...mutationOptions,
  });
}

export default useUpdateMyProfile;
