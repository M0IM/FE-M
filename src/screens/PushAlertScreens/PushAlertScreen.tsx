import {
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useState} from 'react';

import {Typography} from 'components/@common/Typography/Typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useGetInfiniteAllAlertList} from 'hooks/queries/PushAlertScreen/useGetInfiniteAllAlertList.ts';
import useDeleteAllAlertList from 'hooks/queries/PushAlertScreen/useDeleteAllAlertList.ts';

const PushAlertScreen = () => {
  const {
    data: alerts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteAllAlertList(8);
  const {mutate: deleteAllAlerts} = useDeleteAllAlertList();

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

  const handleDelteAllAlert = () => {
    Alert.alert(
      '정말 모든 알림을 삭제하시겠습니까?',
      '삭제된 알림은 다시 볼 수 없습니다.',
      [
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            deleteAllAlerts(
              {},
              {
                onError: error => console.log(error),
              },
            );
          },
        },
        {
          text: '취소',
          style: 'default',
        },
      ],
    );
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <TouchableOpacity
        className="p-5"
        activeOpacity={0.8}
        onPress={handleDelteAllAlert}>
        <Typography
          fontWeight="BOLD"
          className="text-main text-sm underline mt-4">
          전체 삭제
        </Typography>
      </TouchableOpacity>
      <FlatList
        data={alerts.pages.flatMap(item => item.alarmResponseDTOList)}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex flex-row items-center bg-gray-100 py-3 px-4 rounded-2xl">
              <View className="bg-gray-200 items-center justify-center p-2 rounded-full w-[50] h-[50]">
                <Ionicons
                  name="notifications-outline"
                  size={30}
                  color={'#00F0A1'}
                />
              </View>
              <View className="flex flex-col gap-y-0.5 ml-4">
                <Typography fontWeight="BOLD" className="text-sm text-dark-800">
                  {item.title}
                </Typography>
                <Typography
                  fontWeight="MEDIUM"
                  className="text-xs text-gray-300">
                  {/* 시간데이터 넣기 */}
                  {item.content}
                </Typography>
                <Typography
                  fontWeight="MEDIUM"
                  className="text-sm text-dark-800 pt-1 max-w-[95%]"
                  numberOfLines={1}>
                  {item.content}
                </Typography>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => String(item.alarmId)}
        numColumns={1}
        contentContainerStyle={{
          paddingHorizontal: 30,
          gap: 10,
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        scrollIndicatorInsets={{right: 1}}
        indicatorStyle={'black'}
      />
    </SafeAreaView>
  );
};

export default PushAlertScreen;
