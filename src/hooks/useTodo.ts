import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useMutation,
  useQuery,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {
  ResponseError,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from 'types/mutations/common.ts';
import {createMoimTodo, getDetailTodo, getMoimTodoList} from 'apis/todo.ts';

import {queryClient} from '../containers/TanstackQueryContainer.tsx';
import {queryKeys} from '../constants/storageKeys/keys.ts';
import {TTodoDetailDTO, TTodoListResponse} from '../types/dtos/todo.ts';

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

function getInfiniteMoimTodoList(
  moimId: number,
  take: number,
  queryOptions?: UseInfiniteQueryOptions<
    TTodoListResponse,
    ResponseError,
    InfiniteData<TTodoListResponse, number>,
    TTodoListResponse,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) =>
      getMoimTodoList({moimId, cursor: pageParam, take}),
    queryKey: [queryKeys.TODOS, moimId],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

function useGetMoimTodoDetail(
  moimId: number,
  todoId: number,
  queryOptions?: UseQueryCustomOptions<TTodoDetailDTO>,
) {
  return useQuery({
    queryFn: () => getDetailTodo({moimId, todoId}),
    queryKey: [queryKeys.TODOS, moimId, todoId],
    ...queryOptions,
  });
}

function useTodo() {
  const createTodoMutation = useCreateTodo();

  return {
    createTodoMutation,
    getInfiniteMoimTodoList,
    useGetMoimTodoDetail,
  };
}

export default useTodo;
