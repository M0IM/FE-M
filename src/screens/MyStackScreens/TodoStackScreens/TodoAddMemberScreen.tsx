import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import Avatar from 'components/@common/Avatar/Avatar.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';

import useTodo from 'hooks/useTodo.ts';
import {TodoStackNavigationProp, TodoStackRouteProp} from 'navigators/types';

export default function TodoAddMemberScreen() {
  const navigation = useNavigation<TodoStackNavigationProp>();
  const route = useRoute<TodoStackRouteProp>();
  const moimId = route.params.moimId;
  const todoId = route.params.todoId;
  const {useGetInfiniteNoneAssignedMemberList, updateAssignedMember} =
    useTodo();
  const {
    data: members,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useGetInfiniteNoneAssignedMemberList(moimId, todoId, 7);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const handleToggleSelectedIds = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id],
    );
  };
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

  if (isPending) {
    return (
      <View className="flex-col items-center justify-center flex-1">
        <ActivityIndicator size="large" color={'#00F0A1'} />
      </View>
    );
  }

  if (isError) {
    return <View></View>;
  }

  const handlePressAddMembers = () => {
    updateAssignedMember.mutate(
      {moimId, todoId, addAssigneeIdList: selectedIds},
      {
        onSuccess: () => {
          navigation.goBack();
        },
      },
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={members?.pages.flatMap(page => page.list)}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => handleToggleSelectedIds(item.assigneeId)}
              className="flex-row items-center w-full gap-x-2">
              <View className="flex flex-col items-center justify-center border-gray-400 border-[1px] p-[5] rounded-full w-[15] h-[15] mr-4">
                <View
                  className={`${
                    selectedIds.includes(item.assigneeId) ? 'bg-main' : ''
                  } rounded-full w-[10] h-[10]`}
                />
              </View>
              <Avatar uri={item.profileImageUrl} />
              <Typography fontWeight={'BOLD'}>{item.nickname}</Typography>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{
          padding: 20,
          gap: 20,
        }}
        keyExtractor={item => String(item.assigneeId)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        scrollIndicatorInsets={{right: 1}}
      />
      <View className="right-0 left-0 h-20 flex-col justify-center px-3 mb-3">
        <CustomButton
          label={updateAssignedMember.isPending ? '멤버 추가 중' : '멤버 추가'}
          onPress={handlePressAddMembers}
          disabled={updateAssignedMember.isPending}
          textStyle="font-bold text-base text-white"
        />
      </View>
    </SafeAreaView>
  );
}
