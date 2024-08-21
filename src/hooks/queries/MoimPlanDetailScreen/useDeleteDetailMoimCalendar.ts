import {useMutation} from '@tanstack/react-query';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {deleteDetailMoimCalendar} from 'apis';
import Toast from 'react-native-toast-message';

function useDeleteDetailMoimCalendar(
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: deleteDetailMoimCalendar,
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error.message,
        visibilityTime: 2000,
        position: 'bottom',
      });
    },
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

export default useDeleteDetailMoimCalendar;
