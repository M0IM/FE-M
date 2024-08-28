import {
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useState} from 'react';
import moment from 'moment';
import 'moment/locale/ko';

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
            deleteAllAlerts(null, {
              onError: error => console.log(error),
            });
          },
        },
        {
          text: '취소',
          style: 'default',
        },
      ],
    );
  };

  const alarmResponseDTO = alerts.pages.flatMap(
    item => item.alarmResponseDTOList,
  );

  return (
    <SafeAreaView className="bg-white flex-1">
      <TouchableOpacity
        className={`p-5`}
        activeOpacity={0.8}
        disabled={alarmResponseDTO.length === 0}
        onPress={handleDelteAllAlert}>
        <Typography
          fontWeight="BOLD"
          className={`text-main text-sm underline mt-4  ${alarmResponseDTO.length === 0 && 'text-gray-500'}`}>
          전체 삭제
        </Typography>
      </TouchableOpacity>
      {alarmResponseDTO.length !== 0 ? (
        <FlatList
          data={alarmResponseDTO}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex flex-row items-center bg-gray-100 py-4 px-4 rounded-2xl">
                <View className="bg-gray-200 items-center justify-center p-2 rounded-full w-[50] h-[50]">
                  <Ionicons
                    name="notifications-outline"
                    size={30}
                    color={'#00F0A1'}
                  />
                </View>
                <View className="flex flex-col gap-y-0.5 ml-4 w-[220]">
                  <Typography
                    numberOfLines={1}
                    fontWeight="BOLD"
                    className="text-gray-600">
                    {item.title}
                  </Typography>
                  <Typography
                    numberOfLines={1}
                    fontWeight="MEDIUM"
                    className="text-xs text-gray-300">
                    {/* 시간데이터 넣기 */}
                    {moment(item.createdAt).fromNow()}
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
      ) : (
        <View className="flex-row items-center justify-center h-[70%]">
          <Typography fontWeight="LIGHT" className="text-gray-600 text-base">
            알림 목록이 존재하지 않습니다.
          </Typography>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PushAlertScreen;
