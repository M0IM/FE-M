import {useEffect} from 'react';
import {CompositeNavigationProp} from '@react-navigation/native';

import useCommentStore from 'stores/useCommentStore';
import usePost from 'hooks/queries/MoimBoard/usePost';
import PostCommentContainer from './PostCommentContainer';
import {
  MoimPostStackNavigationProp,
  MyStackNavigationProp,
} from 'navigators/types';

interface PostCommentViewProps {
  id?: number;
  postId?: number;
  navigation: CompositeNavigationProp<
    MoimPostStackNavigationProp,
    MyStackNavigationProp
  >;
  isRefreshing: boolean;
  isEndReached: boolean;
}

const PostCommentView = ({
  id,
  postId,
  isRefreshing,
  isEndReached,
}: PostCommentViewProps) => {
  const {commentId, handleUpdateCommentId} = useCommentStore();
  const {useGetInfiniteMoimPostComment} = usePost();
  const {
    data: comments,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch: refetchComment,
  } = useGetInfiniteMoimPostComment(id, postId);

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && isEndReached) {
      fetchNextPage();
    }
  }, [isEndReached]);

  useEffect(() => {
    const refetch = async () => {
      if (isRefreshing) {
        await refetchComment();
      }
    };
    refetch();
  }, [isRefreshing, refetchComment]);

  return (
    <>
      {comments?.pages
        .flatMap(data => data.moimPreviewList)
        .map(item => (
          <PostCommentContainer
            key={item.commentId}
            moimId={id}
            postId={postId}
            targetCommentId={commentId}
            handleUpdateCommentId={handleUpdateCommentId}
            commentData={item}
          />
        ))}
    </>
  );
};

export default PostCommentView;
