import {FlatList, Pressable, SafeAreaView, View} from 'react-native';

import useTodo from 'hooks/useTodo.ts';
import {useState} from 'react';
import FastImage from 'react-native-fast-image';
import DefaultIcon from '../../../components/@common/DefaultIcon/DefaultIcon.tsx';
import {Typography} from '../../../components/@common/Typography/Typography.tsx';
import moment from 'moment/moment';
import Avatar from '../../../components/@common/Avatar/Avatar.tsx';
import Label from '../../../components/@common/Label/Label.tsx';

export default function ParticipantList({
  moimId,
  todoId,
}: {
  moimId: number;
  todoId: number;
}) {
  const {getInfiniteMoimTodoParticipantList} = useTodo();
  const {
    data: participants,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = getInfiniteMoimTodoParticipantList(moimId, todoId, 5);

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

  const participantList = participants.pages.flatMap(page => page.list);

  return (
    <FlatList
      data={participantList}
      renderItem={({item}) => {
        return (
          <View className="flex-row justify-between items-center w-full p-2 border-b border-gray-200">
            <View className="flex-row w-[200] items-center space-x-4 flex-shrink-0">
              <Avatar uri={item?.profileImageUrl} />
              <Typography
                numberOfLines={1}
                fontWeight={'BOLD'}
                className="text-sm">
                {item.nickname}
              </Typography>
            </View>
            <Label
              style={item.todoStatus === 'LOADING' ? 'bg-main' : 'bg-blue'}
              variant={'filled'}
              label={item.todoStatus === 'LOADING' ? '대기 중' : '완료'}
            />
          </View>
        );
      }}
      keyExtractor={item => String(item.assigneeId)}
      numColumns={1}
      contentContainerStyle={{
        padding: 10,
      }}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      scrollIndicatorInsets={{right: 1}}
      indicatorStyle={'black'}
    />
  );
}
