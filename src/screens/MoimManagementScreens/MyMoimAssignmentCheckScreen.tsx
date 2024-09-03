import {FlatList, Pressable, SafeAreaView, View} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {
  MoimManagementNavigationProp,
  MoimManagementRouteProp,
} from 'navigators/types';
import useTodo from '../../hooks/useTodo.ts';
import {useState} from 'react';
import FastImage from 'react-native-fast-image';
import DefaultIcon from '../../components/@common/DefaultIcon/DefaultIcon.tsx';
import moment from 'moment/moment';

export default function MyMoimAssignmentCheckScreen({
  route,
  navigation,
}: {
  route: MoimManagementRouteProp;
  navigation: MoimManagementNavigationProp;
}) {
  const moimId = route.params.id as number;
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

  const todoList = todos.pages.flatMap(page => page.list);

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="p-1 flex-1">
        <FlatList
          data={todoList}
          renderItem={({item}) => {
            console.log(item);
            return (
              <Pressable
                className="flex flex-row p-[6] h-[102] items-center active:bg-hover active:rounded-lg"
                onPress={() =>
                  navigation.navigate('MOIM_DETAIL_TODO', {
                    moimId,
                    id: item.todoId,
                  })
                }>
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
                    담당자: {item.writerNickname}
                  </Typography>
                  <View className="flex flex-row gap-2">
                    <Typography
                      fontWeight="LIGHT"
                      className="text-gray-500 text-xs">
                      마감일: {moment(item.dueDate).format('YYYY년 MM월 DD일')}
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
      </View>
    </SafeAreaView>
  );
}