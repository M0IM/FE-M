import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import {Typography} from 'components/@common/Typography/Typography';
import DefaultIcon from 'components/@common/DefaultIcon/DefaultIcon';

import useTodo from 'hooks/useTodo';
import {useNavigation} from '@react-navigation/native';
import {TodoStackNavigationProp} from 'navigators/types';

export default function MyAssignmentTodoScreen() {
  const navigation = useNavigation<TodoStackNavigationProp>();
  const {getInfiniteMyAssignmentTodoList} = useTodo();
  const {
    data: todos,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = getInfiniteMyAssignmentTodoList(8);

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

  if (isPending) {
    return (
      <View className="flex-col items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color={'#00F0A1'} />
      </View>
    );
  }

  if (isError) {
    return <View></View>;
  }

  const todoList = todos.pages.flatMap(page => page.list);

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="p-1 flex-1">
        {todoList.length !== 0 ? (
          <FlatList
            data={todoList}
            renderItem={({item}) => {
              return (
                <Pressable
                  className="flex flex-row p-[6] h-[102] items-center active:bg-hover active:rounded-lg"
                  onPress={() => {
                    navigation.navigate('DETAIL_TODO', {
                      id: item.todoId,
                      moimId: item.moimId,
                    });
                  }}>
                  {item.imageUrlList[0] ? (
                    <FastImage
                      source={{uri: item.imageUrlList[0]}}
                      className="rounded-lg w-[55px] h-[55px]"
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  ) : (
                    <View className="flex flex-col items-center justify-center bg-gray-100 w-[55px] h-[55px] rounded-lg">
                      <DefaultIcon height={30} width={30} />
                    </View>
                  )}
                  <View className="flex flex-col ml-3 w-[250px] gap-y-0.5">
                    <Typography
                      fontWeight="BOLD"
                      className="text-dark-800 text-base"
                      numberOfLines={1}>
                      {item.title}
                    </Typography>
                    <Typography
                      fontWeight="BOLD"
                      className="text-gray-400 text-xs w-full"
                      numberOfLines={1}>
                      모임명: {item.moimName}
                    </Typography>
                    <View className="flex flex-row gap-2">
                      <Typography
                        fontWeight="LIGHT"
                        className="text-gray-500 text-xs">
                        마감일:{' '}
                        {moment(item.dueDate).format('YYYY년 MM월 DD일')}
                      </Typography>
                    </View>
                  </View>
                </Pressable>
              );
            }}
            keyExtractor={item => String(item.todoId)}
            numColumns={1}
            contentContainerStyle={{
              paddingHorizontal: 30,
            }}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            scrollIndicatorInsets={{right: 1}}
            indicatorStyle={'black'}
          />
        ) : (
          <View className="flex-col p-20 gap-5 mt-5 items-center justify-center">
            <Typography className="text-sm text-gray-300" fontWeight={'BOLD'}>
              내가 할당한 할 일이 없습니다.
            </Typography>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
