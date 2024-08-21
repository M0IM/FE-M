import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {RevokeMoimStackNavigatorProp} from 'navigators/types';
import {FlatList, Image, Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useGetInfiniteMyActiveMoim} from '../../hooks/queries/MoimHomeScreen/useGetInfiniteMyActiveMoim.ts';
import {useState} from 'react';
import {ActiveMoimCard} from '../../components/calendar/ActiveMoimCard.tsx';

const ActiveMoimData = [
  {
    id: 1,
    title: '우리 동네 배드민턴',
    subTitle: '배드민턴도 열심히 해서 대회도 나가 강사 활동도 해봐요',
    category: '외국/언어',
    region: '서울',
    memberCount: 3,
    spaceImg: '',
  },
  {
    id: 2,
    title: '서울 영어 회화',
    subTitle: '영어 실력을 키워보아요',
    category: '외국/언어',
    region: '서울',
    memberCount: 10,
    spaceImg: '',
  },
  {
    id: 3,
    title: '강남 요가 클럽',
    subTitle: '편안한 요가와 함께 건강을 챙기세요',
    category: '운동/건강',
    region: '서울',
    memberCount: 15,
    spaceImg: '',
  },
];

interface RevokeMoimScreenProps {
  navigation: RevokeMoimStackNavigatorProp;
}

export default function RevokeMoimScreen({navigation}: RevokeMoimScreenProps) {
  const {
    data: moims,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useGetInfiniteMyActiveMoim();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isPending || isError) {
    return <></>;
  }
  return (
    <View className="flex-1 bg-white">
      <View className="p-5">
        <Typography fontWeight={'BOLD'} className="text-lg">
          어떤 모임을 탈퇴하시겠어요?
        </Typography>
      </View>
      <FlatList
        data={moims.pages.flatMap(page => page.moimPreviewList)}
        renderItem={({item}) => {
          return (
            <ActiveMoimCard
              onPress={() =>
                navigation.navigate('REVOKE_MOIM_DETAIL', {
                  id: item.moimId,
                })
              }
              moim={item}
            />
          );
        }}
        keyExtractor={item => String(item.moimId)}
        numColumns={1}
        contentContainerStyle={{paddingHorizontal: 30, gap: 10}}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        scrollIndicatorInsets={{right: 1}}
        indicatorStyle={'black'}
      />
    </View>
  );
}
