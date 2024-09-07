import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {postInquireEmail} from 'apis';

function usePostInquireEmail(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postInquireEmail,
    onSuccess: data => {
      Toast.show({
        type: 'success',
        text1: data,
        visibilityTime: 2000,
        position: 'bottom',
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error?.response?.data.message,
        visibilityTime: 2000,
        position: 'bottom',
      });
    },
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useEmail() {
  const postInquireEmailMutation = usePostInquireEmail();

  return {
    postInquireEmailMutation,
  };
}

export default useEmail;
