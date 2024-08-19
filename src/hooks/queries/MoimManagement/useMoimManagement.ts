import { InfiniteData, QueryKey, useInfiniteQuery, UseInfiniteQueryOptions, useMutation } from "@tanstack/react-query";
import { acceptMoimJoinRequest, getMoimRequestUsers, updateMoimAuthorities, updateMoimInfo } from "apis/moimManage";
import { TMoimRequestUsers } from "types/dtos/moimManage";
import { ResponseError, UseMutationCustomOptions } from "types/mutations/common";

function useGetInfinityMoimRequest (
    moimId: number,
    queryOptions?: UseInfiniteQueryOptions<
        TMoimRequestUsers,
        ResponseError,
        InfiniteData<TMoimRequestUsers, number>,
        TMoimRequestUsers,
        QueryKey,
        number
    >
) {
    return useInfiniteQuery({
        queryFn: ({pageParam}) => getMoimRequestUsers({
            moimId,
            cursor: pageParam,
            take: 10
        }),
        queryKey: ['moimRequests'],
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.hasNext ? lastPage.nextCursor : undefined;
        },
        ...queryOptions
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
        ...mutationOptions
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
        ...mutationOptions
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
        ...mutationOptions
    });
}

function useMoimManagment() {
    const updateMoimAuthoritiesMutation = useUpdateMoimAuthorities();
    const acceptMoimJoinRequestMutation = useAcceptMoimJoinRequest();
    const updateMoimInfoMutation = useUpdateMoimInfo();

    return {
        useGetInfinityMoimRequest,
        updateMoimAuthoritiesMutation,
        acceptMoimJoinRequestMutation,
        updateMoimInfoMutation
    };
}

export default useMoimManagment;