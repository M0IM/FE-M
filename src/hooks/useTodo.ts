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
import {
  createMoimTodo,
  deleteMoimTodo,
  getDetailTodo,
  getDetailTodoMemberList,
  getIndividualAssignmentTodoList,
  getMoimTodoList,
  getMyAssignedTodo,
  getMyAssignmentTodoList,
  modifyMoimTodo,
  modifyMyTodoStatus,
} from 'apis/todo.ts';

import {queryClient} from '../containers/TanstackQueryContainer.tsx';
import {queryKeys} from '../constants/storageKeys/keys.ts';
import {
  TIndividualAssignmentTodoListResponse,
  TMyAssignmentTodoResponse,
  TTodoDetailDTO,
  TTodoListResponse,
  TTodoParticipantResponse,
} from '../types/dtos/todo.ts';

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

function getInfiniteMoimTodoParticipantList(
  moimId: number,
  todoId: number,
  take: number,
  queryOptions?: UseInfiniteQueryOptions<
    TTodoParticipantResponse,
    ResponseError,
    InfiniteData<TTodoParticipantResponse, number>,
    TTodoParticipantResponse,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) =>
      getDetailTodoMemberList({moimId, todoId, cursor: pageParam, take}),
    queryKey: [queryKeys.TODOS, queryKeys.TODOS_MEMBER, moimId, todoId],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

function getInfiniteIndividualAssignmentTodoList(
  moimId: number,
  take: number,
  queryOptions?: UseInfiniteQueryOptions<
    TIndividualAssignmentTodoListResponse,
    ResponseError,
    InfiniteData<TIndividualAssignmentTodoListResponse, number>,
    TIndividualAssignmentTodoListResponse,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) =>
      getIndividualAssignmentTodoList({moimId, cursor: pageParam, take}),
    queryKey: [queryKeys.TODOS, queryKeys.TODOS_INDIVIDUAL, moimId],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

function getInfiniteMyAssignmentTodoList(
  take: number,
  queryOptions?: UseInfiniteQueryOptions<
    TIndividualAssignmentTodoListResponse,
    ResponseError,
    InfiniteData<TIndividualAssignmentTodoListResponse, number>,
    TIndividualAssignmentTodoListResponse,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) =>
      getMyAssignmentTodoList({cursor: pageParam, take}),
    queryKey: [queryKeys.TODOS, queryKeys.TODOS_MY],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

function useModifyMoimTodo(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: modifyMoimTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.TODOS]});
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

function useDeleteMoimTodo(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deleteMoimTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.TODOS]});
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

function useGetMyAssignedTodo(
  moimId: number,
  todoId: number,
  queryOptions?: UseQueryCustomOptions<TMyAssignmentTodoResponse>,
) {
  return useQuery({
    queryFn: () => getMyAssignedTodo({moimId, todoId}),
    queryKey: [queryKeys.TODOS_MY, moimId, todoId],
    ...queryOptions,
  });
}

function useModifyMyTodoStatus(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: modifyMyTodoStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.TODOS]});
      queryClient.invalidateQueries({queryKey: [queryKeys.TODOS_MY]});
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

function useTodo() {
  const createTodoMutation = useCreateTodo();
  const modifyTodoMutation = useModifyMoimTodo();
  const deleteTodoMutation = useDeleteMoimTodo();
  const modifyMyTodoStatus = useModifyMyTodoStatus();

  return {
    createTodoMutation,
    getInfiniteMoimTodoList,
    useGetMoimTodoDetail,
    getInfiniteMoimTodoParticipantList,
    getInfiniteIndividualAssignmentTodoList,
    getInfiniteMyAssignmentTodoList,
    modifyTodoMutation,
    deleteTodoMutation,
    useGetMyAssignedTodo,
    modifyMyTodoStatus,
  };
}

export default useTodo;
