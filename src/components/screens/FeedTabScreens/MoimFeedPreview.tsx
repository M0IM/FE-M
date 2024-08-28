import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Typography} from 'components/@common/Typography/Typography';
import useGetInfinityMoimIntroducePosts from 'hooks/queries/NewFeedHomeScreen/useGetInfinityMoimIntroducePosts';
import {HomeStackNavigationProp} from 'navigators/types';
import {TMoimPreviewListDto} from 'types/dtos/post';
import {detailDate} from 'utils';
import DefaultIcon from '../../@common/DefaultIcon/DefaultIcon.tsx';

interface MoimFeedPreviewProps {
  isRefreshing: boolean;
}

const MoimFeedPreview = ({isRefreshing}: MoimFeedPreviewProps) => {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const {
    data,
    refetch: refetchMoimIntroducePosts,
    isPending,
  } = useGetInfinityMoimIntroducePosts(5);
  const newFeedData = data?.pages[0].moimPreviewList;

  useEffect(() => {
    const refetch = async () => {
      if (isRefreshing) {
        await refetchMoimIntroducePosts();
      }
    };
    refetch();
  }, [isRefreshing]);

  if (isPending) {
    return <Typography fontWeight="MEDIUM">로딩 중</Typography>;
  }

  const card = (item: TMoimPreviewListDto) => (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-gray-100 rounded-lg flex-1"
      key={item.moimPostId}
      onPress={() =>
        navigation.navigate('MOIM_STACK', {
          screen: 'MOIM_SPACE',
          params: {
            // TODO: API 반환 데이터 변경
            id: 8,
          },
        })
      }>
      {item.moimImageUrl ? (
        <Image
          source={{uri: item.moimImageUrl}}
          className="w-full h-[200px] rounded-tl-lg rounded-tr-lg"
        />
      ) : (
        <View className="flex flex-col items-center justify-center w-full h-[200px] rounded-tl-lg rounded-tr-lg">
          <DefaultIcon height={75} width={75} />
        </View>
      )}
      <View className="flex flex-col p-3">
        <Typography
          fontWeight="BOLD"
          className="text-dark-800 text-base"
          numberOfLines={1}>
          {item.title}
        </Typography>
        <Typography
          fontWeight="MEDIUM"
          className="text-gray-600 text-sm"
          numberOfLines={3}>
          {item.content}
        </Typography>
        <View className="flex flex-row items-center mt-4">
          <Typography
            fontWeight="MEDIUM"
            className="text-gray-400 text-xs mr-2">
            {detailDate(new Date(item.createAt))}
          </Typography>
          <Ionicons
            name="heart-outline"
            color={'#9EA4AA'}
            style={{marginLeft: 'auto', marginRight: 5}}
          />
          <Typography fontWeight="MEDIUM" className="text-gray-400 text-xs">
            {item.likeCount}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex flex-col gap-y-3">
      <Typography className="text-lg mb-2 text-dark-800" fontWeight={'BOLD'}>
        여러 모임을 둘러보세요
      </Typography>
      {newFeedData?.slice(0, 2).map(item => card(item))}
      <View className="flex flex-row gap-x-3">
        {newFeedData?.slice(2, 4).map(item => card(item))}
      </View>
      <View className="flex flex-row gap-x-3">
        {newFeedData?.slice(4, 6).map(item => card(item))}
      </View>
    </View>
  );
};

export default MoimFeedPreview;
