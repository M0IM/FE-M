import {SafeAreaView, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {RouteProp} from '@react-navigation/native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import DefaultIcon from 'components/@common/DefaultIcon/DefaultIcon.tsx';

import {MoimManagementParamList} from 'navigators/types';
import useTodo from 'hooks/useTodo.ts';

export default function MoimTodoDetailScreen({
  route,
}: {
  route: RouteProp<MoimManagementParamList, 'MOIM_DETAIL_TODO'>;
}) {
  const moimId = route.params.moimId as number;
  const todoId = route.params.id as number;

  const {useGetMoimTodoDetail} = useTodo();
  const {data: todo} = useGetMoimTodoDetail(moimId, todoId);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="m-4 p-4 bg-white rounded-2xl shadow-lg">
        <View className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
          {todo?.imageUrlList[0] ? (
            <FastImage
              source={{uri: todo?.imageUrlList[0]}}
              className="w-full h-full"
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <View className="flex flex-col items-center justify-center w-full h-[240px]">
              <DefaultIcon height={100} width={100} />
            </View>
          )}
        </View>

        <Typography
          fontWeight={'BOLD'}
          className="text-xl font-bold text-gray-800 mb-2">
          {todo?.title || '할일 제목 없음'}
        </Typography>
        <Typography
          fontWeight={'BOLD'}
          className="text-base text-gray-600 mb-4">
          {todo?.content || '내용 없음'}
        </Typography>
        <Typography fontWeight={'BOLD'} className="text-sm text-gray-500">
          마감 기한 :{' '}
          {todo?.dueDate
            ? moment(todo.dueDate).format('YYYY년 MM월 DD일')
            : '마감 기한 없음'}
        </Typography>
      </View>
    </SafeAreaView>
  );
}
