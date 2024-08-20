import {useMutation} from '@tanstack/react-query';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {postMoimScheduleParticipation} from 'apis';

function usePostMoimScheduleParticipation(
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: postMoimScheduleParticipation,
    onError: error => console.log(error),
    ...mutationOptions,
  });
}

export default usePostMoimScheduleParticipation;
