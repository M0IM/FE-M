import {KeyboardAvoidingView, Platform} from 'react-native';
import {useCallback, useState} from 'react';
import {RefreshControl} from 'react-native-gesture-handler';
import {CompositeNavigationProp} from '@react-navigation/native';

import {
  MoimPostStackNavigationProp,
  MoimPostStackRouteProp,
  MyStackNavigationProp,
} from 'navigators/types';
import CommentInput from 'components/screens/MoimBoardStackScreens/postDetail/CommentInput';
import PostInfo from 'components/screens/MoimBoardStackScreens/postDetail/PostInfo';
import {ScreenContainer} from 'components/ScreenContainer';
import PostCommentView from 'components/screens/MoimBoardStackScreens/postDetail/PostCommentView';

interface MoimPostDetailScreenProps {
  route: MoimPostStackRouteProp;
  navigation: CompositeNavigationProp<
    MoimPostStackNavigationProp,
    MyStackNavigationProp
  >;
}

const MoimPostDetailScreen = ({
  route,
  navigation,
}: MoimPostDetailScreenProps) => {
  const {id, postId} = route.params;
  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    wait(2000).then(() => setIsRefreshing(false));
  }, []);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 70}
      behavior="padding"
      className="flex-1">
      <ScreenContainer
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <PostInfo
          id={id}
          postId={postId}
          navigation={navigation}
          isRefreshing={isRefreshing}
        />
        <PostCommentView
          id={id}
          postId={postId}
          navigation={navigation}
          isRefreshing={isRefreshing}
        />
      </ScreenContainer>

      <CommentInput id={id} postId={postId} />
    </KeyboardAvoidingView>
  );
};

export default MoimPostDetailScreen;
