import {useMutation} from '@tanstack/react-query';

import {postMemberReview} from 'apis';
import {UseMutationCustomOptions} from 'types/mutations/common';

function usePostReviewMutation(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postMemberReview,
    ...mutationOptions,
  });
}

export default usePostReviewMutation;
