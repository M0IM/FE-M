import {useMutation} from '@tanstack/react-query';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {deleteMoimScheduleParticipation} from 'apis';

function useDeleteMoimScheduleParticipation(
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: deleteMoimScheduleParticipation,
    onError: error => console.log(error),
    ...mutationOptions,
  });
}

export default useDeleteMoimScheduleParticipation;
