import {SafeAreaView, View} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {NewFeedHomeRouteProp} from 'navigators/types';
import useGetDetailMoimIntroducePost from 'hooks/queries/NewFeedDetailScreen/useGetDetailMoimIntroducePost.ts';
import FastImage from 'react-native-fast-image';
import Avatar from '../../components/@common/Avatar/Avatar.tsx';

interface INewFeedDetailScreenProps {
  route: NewFeedHomeRouteProp;
}

function NewFeedDetailScreen({route}: INewFeedDetailScreenProps) {
  const postId = route.params?.id as number;
  const {
    data: post,
    isPending,
    isError,
  } = useGetDetailMoimIntroducePost({postId});

  if (isPending || isError) {
    return <View></View>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <Typography
          style={{fontFamily: 'MangoByeolbyeol'}}
          className="text-3xl"
          fontWeight={'BOLD'}>
          {post.title}
        </Typography>
        <View className="flex-row items-center py-2">
          <View className="flex-row items-center">
            <Avatar uri={post.profileImage} />
            <Typography className="ml-2" fontWeight={'BOLD'}>
              {post.writer}
            </Typography>
          </View>
        </View>
        <FastImage
          source={{uri: post?.imageKeyNames[0]}}
          className="w-full aspect-[4/3] rounded-2xl"
          resizeMode={FastImage.resizeMode.cover}
        />
        <Typography
          style={{fontFamily: 'SokchoBadaDotum'}}
          className="text-xl"
          fontWeight={'BOLD'}>
          {post.content}
        </Typography>
      </View>
    </SafeAreaView>
  );
}

export default NewFeedDetailScreen;
