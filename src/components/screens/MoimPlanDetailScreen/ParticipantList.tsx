import {FlatList, SafeAreaView, View} from 'react-native';
import {useState} from 'react';

import {Typography} from '../../@common/Typography/Typography.tsx';
import Avatar from '../../@common/Avatar/Avatar.tsx';

import {useGetInfiniteMoimParticipantList} from 'hooks/queries/MoimPlanDetailScreen/useGetInfiniteMoimParticipantList.ts';

export default function ParticipantList({
  moimId,
  planId,
}: {
  moimId: number;
  planId: number;
}) {
  const {
    data: participants,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteMoimParticipantList(moimId, planId);

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

  return (
    <SafeAreaView>
      <Typography className="text-lg mb-3" fontWeight={'BOLD'}>
        일정 신청자
      </Typography>
      {participants.pages.flat().length === 0 ? (
        <View className="flex-row items-center gap-x-2">
          <Typography className="text-gray-500 text-sm" fontWeight={'BOLD'}>
            아직 해당 일정에 신청을 한 멤버가 없습니다.
          </Typography>
        </View>
      ) : (
        <FlatList
          data={participants.pages.flat()}
          renderItem={({item}) => {
            return (
              <>
                <View
                  key={item?.userId}
                  className="flex-row items-center gap-x-2">
                  <Avatar uri={item?.imageUrl} />
                  <Typography fontWeight={'BOLD'}>{item?.nickname}</Typography>
                </View>
              </>
            );
          }}
          keyExtractor={item => String(item.userId)}
          numColumns={1}
          contentContainerStyle={{
            paddingHorizontal: 30,
            gap: 10,
            height: 150,
          }}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          scrollIndicatorInsets={{right: 1}}
          indicatorStyle={'black'}
        />
      )}
    </SafeAreaView>
  );
}
