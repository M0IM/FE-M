import React, {useState} from 'react';
import {View} from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {DetailItem} from './components/DetailItem.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import DefaultIcon from 'components/@common/DefaultIcon/DefaultIcon.tsx';
import PopoverMenu from 'components/@common/Popover/PopoverMenu/PopoverMenu.tsx';
import Label from 'components/@common/Label/Label.tsx';

import useTodo from 'hooks/useTodo.ts';
import useThrottle from 'hooks/useThrottle.ts';

import {TODO_ASSIGNEE_STATUS} from 'types/dtos/todo.ts';
import {HomeStackRouteProp} from 'navigators/types';

export default function CalendarTodoDetailScreen({
  route,
}: {
  route: HomeStackRouteProp;
}) {
  const moimId = route.params?.moimId;
  const todoId = route.params?.id;

  const {useGetMyAssignedTodo, modifyMyTodoStatus} = useTodo();
  const {data: todo} = useGetMyAssignedTodo(moimId, todoId);
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  const handlePressPopOver = () => {
    setIsPopOverOpen(prev => !prev);
  };

  const handleTodoStatusChange = useThrottle((status: TODO_ASSIGNEE_STATUS) => {
    modifyMyTodoStatus.mutate(
      {
        moimId,
        todoId,
        todoAssigneeStatus: status,
      },
      {
        onSuccess: data => console.log(data),
      },
    );
  });

  const ChangeTodoStatus = [
    {
      title: '완료',
      onPress: () => {
        handleTodoStatusChange(TODO_ASSIGNEE_STATUS.COMPLETE);
      },
    },
    {
      title: '진행 중',
      onPress: () => {
        handleTodoStatusChange(TODO_ASSIGNEE_STATUS.LOADING);
      },
    },
    {
      title: '시작 전',
      onPress: () => {
        handleTodoStatusChange(TODO_ASSIGNEE_STATUS.PENDING);
      },
    },
  ];

  let buttonLabel = '';

  switch (todo?.todoAssigneeStatus) {
    case 'COMPLETE':
      buttonLabel = '완료';
      break;
    case 'LOADING':
      buttonLabel = '진행 중';
      break;
    case 'OVERDUE':
      buttonLabel = '마감';
      break;
    case 'PENDING':
      buttonLabel = '시작 전';
      break;
    default:
      return;
  }

  return (
    <ScreenContainer>
      {todo?.imageUrlList[0] ? (
        <FastImage
          source={{uri: todo?.imageUrlList[0]}}
          resizeMode={FastImage.resizeMode.cover}
          className="w-full aspect-video rounded-2xl"
        />
      ) : (
        <View className="mt-2 flex flex-col items-center justify-center bg-gray-100 w-full h-[200] rounded-lg">
          <DefaultIcon height={200} width={100} />
        </View>
      )}

      <View className="flex flex-row items-center">
        <Typography
          className="text-gray-500"
          fontWeight={'BOLD'}
          numberOfLines={1}>
          마감 기간 | {moment(todo?.dueDate).format('YYYY년 M월 D일')}
        </Typography>
        <Label
          color={
            todo?.todoAssigneeStatus === 'COMPLETE'
              ? 'main'
              : todo?.todoAssigneeStatus === 'LOADING'
                ? 'dark'
                : 'gray'
          }
          label={buttonLabel}
          variant={'filled'}
          style="ml-auto"
        />
      </View>

      <DetailItem iconName="pencil" title="내가 할 일" content={todo?.title} />
      <DetailItem
        isMemo={true}
        iconName="note"
        title="상세 내용"
        content={todo?.content}
      />
      <View className="flex-1" />

      <PopoverMenu
        menu={ChangeTodoStatus}
        isPopover={isPopOverOpen}
        onPress={handlePressPopOver}
      />
      <CustomButton
        textStyle="text-white font-bold text-base"
        label={'상태 변경'}
        onPress={handlePressPopOver}
      />
    </ScreenContainer>
  );
}
