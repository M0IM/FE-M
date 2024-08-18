import { 
    TMoimPostCommentParams,
    TMoimPostCommentsParams,
    TMoimPostDetailParams,
    TMoimPostListParams,
    TMoimPostParams,
    TMoimPostRecommentParams,
    TPostCommentListDto,
    TPostDetailDto,
    TPostDto,
    TPostListDto,
} from "types/dtos/post";
import axiosInstance from "./axiosInstance";

const writeMoimPost = async ({
    moimId,
    title,
    content,
    imageKeyNames,
    postType
}: TMoimPostParams): Promise<TPostDto> => {
    const { data } = await axiosInstance.post('/api/v1/moims/posts', {
        moimId,
        title,
        content,
        imageKeyNames,
        postType
    });
    console.log(data);
    return data;
};

const likeMoimPost = async ({postId}: {postId: number}) => {
    const { data } = await axiosInstance.post('/api/v1/moims/posts/like', {
        postId
    });
    console.log(data);
    return data;
};

const writeMoimPostComment = async ({
    moimId,
    postId,
    content
}: TMoimPostCommentParams): Promise<TPostDto> => {
    const { data } = await axiosInstance.post('/api/v1/moims/posts/comments', {
        moimId,
        postId,
        content
    });
    console.log(data);
    return data;
};

const writeMoimPostRecomment = async ({
    moimId,
    commentId,
    postId,
    content
}: TMoimPostRecommentParams): Promise<TPostDto> => {
    const { data } = await axiosInstance.post('/api/v1/moims/posts/comments/comments', {
        moimId,
        commentId,
        postId,
        content
    });
    console.log(data);
    return data;
};

const likeMoimPostComment = async ({commentId}: {commentId: number}) => {
    const { data } = await axiosInstance.post('/api/v1/moims/comments/Like', {
        commentId
    });
    console.log(data);
    return data;
};

const getMoimPostList = async ({
    moimId,
    postType,
    cursor,
    take
}: TMoimPostListParams): Promise<TPostListDto> => {
    const { data } = await axiosInstance.get(`/api/v1/moims/${moimId}/posts?postType=${postType}&cursor=${cursor}&take=${take}`);
    return data?.result;
};

const getMoimPostDetail = async ({
    moimId,
    postId
}: TMoimPostDetailParams): Promise<TPostDetailDto> => {
    const { data } = await axiosInstance.get(`/api/v1/moims/${moimId}/posts/${postId}`);
    console.log(data);
    return data;
};

const getMoimPostComments = async ({
    moimId,
    postId,
    cursor,
    take
}: TMoimPostCommentsParams): Promise<TPostCommentListDto> => {
    const { data } = await axiosInstance.get(`/api/v1/moims/${moimId}/posts/${postId}/comments?cursor=${cursor}&take=${take}`);
    console.log(data);
    return data;
};

export {
    writeMoimPost,
    likeMoimPost,
    writeMoimPostComment,
    writeMoimPostRecomment,
    likeMoimPostComment,
    getMoimPostList,
    getMoimPostDetail,
    getMoimPostComments
};