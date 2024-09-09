import {FlatList, View} from 'react-native';
import {useState} from 'react';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {ActiveMoimCard} from 'components/calendar/ActiveMoimCard.tsx';

import {RevokeMoimStackNavigatorProp} from 'navigators/types';
import {useGetInfiniteMyActiveMoim} from 'hooks/queries/MoimHomeScreen/useGetInfiniteMyActiveMoim.ts';
import {MOIM_ROLE} from 'types/enums';

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
  } = useGetInfiniteMyActiveMoim(MOIM_ROLE.ALL);

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
        ListHeaderComponent={
          <View className="pt-5">
            <Typography fontWeight={'BOLD'} className="text-lg">
              어떤 모임을 탈퇴하시겠어요?
            </Typography>
          </View>
        }
      />
    </View>
  );
}
