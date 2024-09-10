import {FlatList, View} from 'react-native';
import {useState} from 'react';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import Avatar from 'components/@common/Avatar/Avatar.tsx';
import Label from 'components/@common/Label/Label.tsx';

import useTodo from 'hooks/useTodo.ts';
import {TODO_ASSIGNEE_STATUS} from '../../../types/dtos/todo.ts';

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
    <View>
      <FlatList
        data={participantList}
        renderItem={({item}) => {
          const getStatusClass = (status: TODO_ASSIGNEE_STATUS) => {
            switch (status) {
              case 'LOADING':
                return 'bg-social-kakao text-black';
              case 'PENDING':
                return 'bg-gray-500';
              case 'COMPLETE':
                return 'bg-green-500';
              case 'OVERDUE':
                return 'bg-red-500';
              default:
                return;
            }
          };

          const getStatusLabel = (status: TODO_ASSIGNEE_STATUS) => {
            switch (status) {
              case 'LOADING':
                return '진행 중';
              case 'PENDING':
                return '미확인';
              case 'COMPLETE':
                return '완료';
              case 'OVERDUE':
                return '미제출';
              default:
                return;
            }
          };

          return (
            <View className="flex-row justify-between items-center w-full p-2 border-b border-gray-200">
              <View className="flex-row w-[200] items-center space-x-4 flex-shrink-0">
                <Avatar uri={item?.profileImageUrl} />
                <Typography
                  numberOfLines={1}
                  fontWeight={'BOLD'}
                  className="text-sm text-black">
                  {item.nickname}
                </Typography>
              </View>
              <Label
                style={`${getStatusClass(item.todoAssigneeStatus)}`}
                variant={'filled'}
                label={getStatusLabel(item.todoAssigneeStatus) as string}
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
    </View>
  );
}
