import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {createMoimTodo} from 'apis/todo.ts';

import {queryClient} from '../containers/TanstackQueryContainer.tsx';
import {queryKeys} from '../constants/storageKeys/keys.ts';

function useCreateTodo(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createMoimTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.TODOS]});
      Toast.show({
        type: 'success',
        text1: '성공적으로 할 일이 배정되었습니다.',
        visibilityTime: 2000,
        position: 'bottom',
      });
    },
    onError: error => {
      console.log(error);
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

function getInfiniteMoimTodoList(moimId: number) {}

function useTodo() {
  const createTodoMutation = useCreateTodo();

  return {
    createTodoMutation,
  };
}

export default useTodo;
