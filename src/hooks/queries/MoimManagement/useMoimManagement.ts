import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
} from '@tanstack/react-query';
import {
  acceptMoimJoinRequest,
  getMoimMembers,
  getMoimRequestUsers,
  rejectMoimJoinRequest,
  updateMoimAuthorities,
  updateMoimInfo,
} from 'apis/moimManage';
import {TGetMoimMembers, TMoimRequestUsers} from 'types/dtos/moimManage';
import {ResponseError, UseMutationCustomOptions} from 'types/mutations/common';

function useGetInfinityMoimRequest(
  moimId: number,
  queryOptions?: UseInfiniteQueryOptions<
    TMoimRequestUsers,
    ResponseError,
    InfiniteData<TMoimRequestUsers, number>,
    TMoimRequestUsers,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) =>
      getMoimRequestUsers({
        moimId,
        cursor: pageParam,
        take: 10,
      }),
    queryKey: ['moimRequests', moimId],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

function useGetInfinityMoimMembers(
  moimId: number,
  queryOptions?: UseInfiniteQueryOptions<
    TGetMoimMembers,
    ResponseError,
    InfiniteData<TGetMoimMembers, number>,
    TGetMoimMembers,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) =>
      getMoimMembers({
        moimId,
        cursor: pageParam,
        take: 30,
      }),
    queryKey: ['moimMembers'],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

function useUpdateMoimAuthorities(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateMoimAuthorities,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
    ...mutationOptions,
  });
}

function useAcceptMoimJoinRequest(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: acceptMoimJoinRequest,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
    ...mutationOptions,
  });
}

function useUpdateMoimInfo(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateMoimInfo,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
    ...mutationOptions,
  });
}

function useRejectMoimRequest(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: rejectMoimJoinRequest,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
    ...mutationOptions,
  });
}

function useMoimManagment() {
  const updateMoimAuthoritiesMutation = useUpdateMoimAuthorities();
  const acceptMoimJoinRequestMutation = useAcceptMoimJoinRequest();
  const updateMoimInfoMutation = useUpdateMoimInfo();
  const rejectMoimJoinRequestMutation = useRejectMoimRequest();

  return {
    useGetInfinityMoimRequest,
    useGetInfinityMoimMembers,
    updateMoimAuthoritiesMutation,
    acceptMoimJoinRequestMutation,
    updateMoimInfoMutation,
    rejectMoimJoinRequestMutation,
  };
}

export default useMoimManagment;
