import { InfiniteData, QueryKey, useInfiniteQuery, UseInfiniteQueryOptions, useMutation } from "@tanstack/react-query";
import { getMoimPostList, writeMoimPost } from "apis/post";
import { POST_LIST_TYPE, TPostListDto } from "types/dtos/post";
import { ResponseError, UseMutationCustomOptions } from "types/mutations/common";

function useMoimPost(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: writeMoimPost,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        },
        ...mutationOptions
    });
}

function useGetInfiniteMoimPostList(
    moimId: number,
    postType: POST_LIST_TYPE,
    queryOptions?: UseInfiniteQueryOptions<
    TPostListDto,
    ResponseError,
    InfiniteData<TPostListDto, number>,
    TPostListDto,
    QueryKey,
    number
  >,
) {
    return useInfiniteQuery({
        queryFn: ({pageParam}) => getMoimPostList({
            moimId,
            postType,
            cursor: pageParam,
            take: 10
        }),
        queryKey: ['moim', 'post'],
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.hasNext ? lastPage.nextCursor : undefined;
        },
        ...queryOptions
    });
}


function usePost() {
    const moimPostMutation = useMoimPost();

    return {
        moimPostMutation,
        useGetInfiniteMoimPostList
    };
}

export default usePost;