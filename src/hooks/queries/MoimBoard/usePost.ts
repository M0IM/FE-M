import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  blockMoimPostComment,
  deleteMoimPost,
  deleteMoimPostComment,
  getMoimPostComments,
  getMoimPostDetail,
  getMoimPostList,
  likeMoimPost,
  likeMoimPostComment,
  reportMoimPostComment,
  writeMoimPost,
  writeMoimPostComment,
  writeMoimPostRecomment,
} from 'apis/post';
import {
  POST_LIST_TYPE,
  TPostCommentListDto,
  TPostListDto,
} from 'types/dtos/post';
import {ResponseError, UseMutationCustomOptions} from 'types/mutations/common';

function useMoimPost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: writeMoimPost,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
    ...mutationOptions,
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
    queryFn: ({pageParam}) =>
      getMoimPostList({
        moimId,
        postType,
        cursor: pageParam,
        take: 10,
      }),
    queryKey: ['moim', 'post', postType],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    staleTime: 300000,
    ...queryOptions,
  });
}

function useGetMoimPostDetail(moimId: number, postId: number) {
  const {data, isPending, isError, refetch} = useQuery({
    queryKey: ['moimPost', moimId, postId],
    queryFn: () => getMoimPostDetail({moimId, postId}),
  });

  return {data, isPending, isError, refetch};
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
    queryFn: ({pageParam}) =>
      getMoimPostComments({
        moimId,
        postId,
        cursor: pageParam,
        take: 10,
      }),
    queryKey: ['postComments', moimId, postId],
    initialPageParam: 1,
    getNextPageParam: lastPage => {
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
    ...mutationOptions,
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
    ...mutationOptions,
  });
}

function useLikeMoimPost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: likeMoimPost,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
    ...mutationOptions,
  });
}

function useLikeMoimPostComment(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: likeMoimPostComment,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
    ...mutationOptions,
  });
}

function useDeleteMoimPostComment(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deleteMoimPostComment,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
    ...mutationOptions,
  });
}

function useReportMoimPostComment(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: reportMoimPostComment,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
    ...mutationOptions,
  });
}

function useBlockMoimPostComment(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: blockMoimPostComment,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
    ...mutationOptions,
  });
}

function useDeleteMoimPost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deleteMoimPost,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error(error);
    },
    ...mutationOptions,
  });
}

function usePost() {
  const moimPostMutation = useMoimPost();
  const postWriteCommentMutation = useWriteMoimPostComment();
  const postWriteRecommentMutation = useWriteMoimPostRecomment();
  const likeMoimPostMutation = useLikeMoimPost();
  const likeMoimPostCommentMutation = useLikeMoimPostComment();
  const deleteMoimPostCommentMutation = useDeleteMoimPostComment();
  const reportMoimPostCommentMutation = useReportMoimPostComment();
  const blockMoimPostCommentMutation = useBlockMoimPostComment();
  const deleteMoimPostMutation = useDeleteMoimPost();

  return {
    moimPostMutation,
    postWriteCommentMutation,
    postWriteRecommentMutation,
    likeMoimPostMutation,
    likeMoimPostCommentMutation,
    deleteMoimPostCommentMutation,
    reportMoimPostCommentMutation,
    blockMoimPostCommentMutation,
    deleteMoimPostMutation,
    useGetInfiniteMoimPostList,
    useGetInfiniteMoimPostComment,
    useGetMoimPostDetail,
  };
}

export default usePost;
