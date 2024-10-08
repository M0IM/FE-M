import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {
  MoimManagementNavigationProp,
  MoimManagementParamList,
} from 'navigators/types';
import useTodo from '../../hooks/useTodo.ts';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import DefaultIcon from '../../components/@common/DefaultIcon/DefaultIcon.tsx';
import moment from 'moment/moment';
import {TODO_STATUS} from '../../types/dtos/todo.ts';
import {Logo} from '../../components/@common/Logo/Logo.tsx';
import {CustomButton} from '../../components/@common/CustomButton/CustomButton.tsx';
import {RouteProp} from '@react-navigation/native';

export default function MyMoimAssignmentCheckScreen({
  route,
  navigation,
}: {
  route: RouteProp<MoimManagementParamList, 'MOIM_ASSIGNMENT_TODO'>;
  navigation: MoimManagementNavigationProp;
}) {
  const params = route?.params;
  const moimId = params.id;
  const {getInfiniteIndividualAssignmentTodoList} = useTodo();
  const {
    data: todos,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = getInfiniteIndividualAssignmentTodoList(moimId, 8);

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
              const getStatusLabel = (status: TODO_STATUS) => {
                switch (status) {
                  case 'COMPLETED':
                    return '완료';
                  case 'EXPIRED':
                    return '기간 만료';
                  case 'IN_PROGRESS':
                    return '진행중';
                  default:
                    return;
                }
              };
              return (
                <Pressable
                  className="flex flex-row p-[6] h-[102] items-center active:bg-hover active:rounded-lg"
                  onPress={() => {
                    if (moimId) {
                      navigation.navigate('MOIM_DETAIL_TODO', {
                        moimId,
                        id: item.todoId,
                      });
                    }
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
                    {/*<Typography*/}
                    {/*  fontWeight="BOLD"*/}
                    {/*  className="text-gray-400 text-xs w-full"*/}
                    {/*  numberOfLines={1}>*/}
                    {/*  담당자: {item.todoStatus}*/}
                    {/*</Typography>*/}
                    <View className="flex flex-row gap-2">
                      <Typography
                        fontWeight="LIGHT"
                        className="text-gray-500 text-xs">
                        마감일:{' '}
                        {moment(item.dueDate).format('YYYY년 MM월 DD일')}
                      </Typography>
                      <View className="bg-green-300 px-2 rounded-2xl">
                        <Typography
                          fontWeight="LIGHT"
                          className="text-gray-500 text-xs">
                          {getStatusLabel(item.todoStatus)}
                        </Typography>
                      </View>
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
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }>
            <View className="flex-col p-20 gap-5 mt-5 items-center justify-center">
              <Logo background={'TRANSPARENT'} size={'LG'} />
              <Typography className="text-sm" fontWeight={'BOLD'}>
                내가 할당한 할 일이 없습니다.
              </Typography>
              <Typography fontWeight="BOLD">
                멤버에게 새로운 할 일을 부여해보세요!
              </Typography>
              <CustomButton
                label={'할 일 생성하기'}
                textStyle={'text-white font-bold text-lg'}
                onPress={() => {
                  if (moimId) {
                    navigation.navigate('MOIM_CREATE_TODO', {
                      id: moimId,
                    });
                  }
                }}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
