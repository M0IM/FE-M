import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {useMutation} from '@tanstack/react-query';
import {postSignup} from '../../../apis';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useAuth() {
  const signUpMutation = useSignup();

  return {
    signUpMutation,
  };
}

export default useAuth;
