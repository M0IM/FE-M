import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {useCallback, useRef, useState} from 'react';
import {RefreshControl} from 'react-native-gesture-handler';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';

import {
  MoimPostStackNavigationProp,
  MoimPostStackParamList,
  MyStackNavigationProp,
} from 'navigators/types';
import CommentInput from 'components/screens/MoimBoardStackScreens/postDetail/CommentInput';
import PostInfo from 'components/screens/MoimBoardStackScreens/postDetail/PostInfo';
import PostCommentView from 'components/screens/MoimBoardStackScreens/postDetail/PostCommentView';

interface MoimPostDetailScreenProps {
  route: RouteProp<MoimPostStackParamList, 'MOIM_POST_DETAIL'>;
  navigation: CompositeNavigationProp<
    MoimPostStackNavigationProp,
    MyStackNavigationProp
  >;
}

const MoimPostDetailScreen = ({
  route,
  navigation,
}: MoimPostDetailScreenProps) => {
  const params = route?.params;
  const {id, postId} = params;
  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    wait(2000).then(() => setIsRefreshing(false));
  }, []);

  const handleScroll = useCallback((event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const contentHeight = contentSize.height;
    const scrollHeight = layoutMeasurement.height + contentOffset.y;

    if (scrollHeight >= contentHeight - 100) {
      setIsEndReached(true);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 70}
      behavior="padding"
      className="flex-1">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={400}>
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
          isEndReached={isEndReached}
        />
      </ScrollView>

      <CommentInput id={id} postId={postId} />
    </KeyboardAvoidingView>
  );
};

export default MoimPostDetailScreen;
