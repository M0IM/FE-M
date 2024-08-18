import { InfiniteData, QueryKey, useInfiniteQuery, UseInfiniteQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { getMoimPostComments, getMoimPostDetail, getMoimPostList, writeMoimPost, writeMoimPostComment, writeMoimPostRecomment } from "apis/post";
import { POST_LIST_TYPE, TPostCommentListDto, TPostListDto } from "types/dtos/post";
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

function useGetMoimPostDetail(moimId: number, postId: number) {
    const { data, isPending, isError } = useQuery({
        queryKey: ['moimPost', moimId, postId],
        queryFn: () => getMoimPostDetail({ moimId, postId }),
    });

    return { data, isPending, isError };
}

function useGetInfiniteMoimPostComment(
    moimId: number,
    postId: number,
    queryOptions?: UseInfiniteQueryOptions<
        TPostCommentListDto,
        ResponseError,
        InfiniteData<TPostCommentListDto, number>,
        TPostCommentListDto,
        QueryKey,
        number
    >,
) {
    return useInfiniteQuery({
        queryFn: ({pageParam}) => getMoimPostComments({
            moimId,
            postId,
            cursor: pageParam,
            take: 10
        }),
        queryKey: ['postComments', moimId, postId ],
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.hasNext ? lastPage.nextCursor : undefined;
        },
        ...queryOptions,
    });
}

function useWriteMoimPostComment(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: writeMoimPostComment,
        onSuccess: data => {
            console.log(data);
        },
        onError: error => {
            console.error(error);
        },
        ...mutationOptions
    });
}

function useWriteMoimPostRecomment(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: writeMoimPostRecomment,
        onSuccess: data => {
            console.log(data);
        },
        onError: error => {
            console.error(error);
        },
        ...mutationOptions
    });
}


function usePost() {
    const moimPostMutation = useMoimPost();
    const postWriteCommentMutation = useWriteMoimPostComment();
    const postWriteRecommentMutation = useWriteMoimPostRecomment();

    return {
        moimPostMutation,
        postWriteCommentMutation,
        postWriteRecommentMutation,
        useGetInfiniteMoimPostList,
        useGetInfiniteMoimPostComment,
        useGetMoimPostDetail,
    };
}

export default usePost;