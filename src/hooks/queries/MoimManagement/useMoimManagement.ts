import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import {
  acceptMoimJoinRequest,
  delegationMoimWangAuthority,
  getMoimMemberListWithOutOwner,
  getMoimMembers,
  getMoimRequestUsers,
  outMoimMember,
  rejectMoimJoinRequest,
  updateMoimAuthorities,
  updateMoimInfo,
} from 'apis/moimManage';
import {TGetMoimMembers, TMoimRequestUsers} from 'types/dtos/moimManage';
import {ResponseError, UseMutationCustomOptions} from 'types/mutations/common';
import Toast from 'react-native-toast-message';
import {queryClient} from '../../../containers/TanstackQueryContainer.tsx';

function useGetInfinityMoimRequest(
  moimId: number,
  search: string,
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
        search,
      }),
    queryKey: ['moimRequests', moimId, search],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

function useGetInfinityMoimMembers(
  moimId: number,
  search: string,
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
        search,
      }),
    queryKey: ['moimMembers', moimId, search],
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
      Toast.show({
        type: 'error',
        text1: error.response?.data.message,
        visibilityTime: 2000,
        position: 'bottom',
      });
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
      Toast.show({
        type: 'error',
        text1: error.response?.data.message,
        visibilityTime: 2000,
        position: 'bottom',
      });
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
      Toast.show({
        type: 'error',
        text1: error.response?.data.message,
        visibilityTime: 2000,
        position: 'bottom',
      });
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
      Toast.show({
        type: 'error',
        text1: error.response?.data.message,
        visibilityTime: 2000,
        position: 'bottom',
      });
    },
    ...mutationOptions,
  });
}

function useDelegationMoimWangAuthority(
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: delegationMoimWangAuthority,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error.response?.data.message,
        visibilityTime: 2000,
        position: 'bottom',
      });
    },
    ...mutationOptions,
  });
}

function useGetInfinityMoimMembersWithOutOwner(
  moimId: number,
  search: string,
  queryOptions?: UseInfiniteQueryOptions<
    TGetMoimMembers,
    ResponseError,
    InfiniteData<TGetMoimMembers, number>,
    TGetMoimMembers,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) =>
      getMoimMemberListWithOutOwner({
        moimId,
        cursor: pageParam,
        take: 30,
        search,
      }),
    queryKey: ['moimMembers', 'notOwner', moimId, search],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

function useOutMoimMember(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: outMoimMember,
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error.response?.data.message,
        visibilityTime: 2000,
        position: 'bottom',
      });
    },
    ...mutationOptions,
  });
}

function useMoimManagment() {
  const updateMoimAuthoritiesMutation = useUpdateMoimAuthorities();
  const acceptMoimJoinRequestMutation = useAcceptMoimJoinRequest();
  const updateMoimInfoMutation = useUpdateMoimInfo();
  const rejectMoimJoinRequestMutation = useRejectMoimRequest();
  const updateMoimWangMutation = useDelegationMoimWangAuthority();
  const outMoimMemberMutation = useOutMoimMember();

  return {
    useGetInfinityMoimRequest,
    useGetInfinityMoimMembers,
    updateMoimAuthoritiesMutation,
    acceptMoimJoinRequestMutation,
    updateMoimInfoMutation,
    rejectMoimJoinRequestMutation,
    updateMoimWangMutation,
    useGetInfinityMoimMembersWithOutOwner,
    outMoimMemberMutation,
  };
}

export default useMoimManagment;
