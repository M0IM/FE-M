import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {RouteProp} from '@react-navigation/native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import DefaultIcon from 'components/@common/DefaultIcon/DefaultIcon.tsx';

import {
  MoimManagementNavigationProp,
  MoimManagementParamList,
} from 'navigators/types';
import useTodo from 'hooks/useTodo.ts';
import ParticipantList from './components/ParticipantList.tsx';
import IonIcons from 'react-native-vector-icons/Ionicons';
import PopoverMenu from '../../components/@common/Popover/PopoverMenu/PopoverMenu.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useTodoStore from '../../stores/useTodoStore.ts';

export default function MoimTodoDetailScreen({
  navigation,
  route,
}: {
  navigation: MoimManagementNavigationProp;
  route: RouteProp<MoimManagementParamList, 'MOIM_DETAIL_TODO'>;
}) {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity className="pr-2" onPress={handlePressRightIcon}>
          <IonIcons name={'menu'} size={25} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const moimId = route.params?.moimId as number;
  const todoId = route.params?.id as number;

  const {useGetMoimTodoDetail, deleteTodoMutation} = useTodo();
  const {data: todo} = useGetMoimTodoDetail(moimId, todoId);
  console.log(todo);

  const {setTodoList, setIsEditMode} = useTodoStore();
  const PostMyMenuList = [
    {
      title: '멤버 추가',
      onPress: () => {
        navigation.navigate('MOIM_ADD_MEMBER', {
          moimId,
          todoId,
        });
      },
    },
    {
      title: '멤버 삭제',
      onPress: () => {
        navigation.navigate('MOIM_DELETE_MEMBER', {
          moimId,
          todoId,
        });
      },
    },
    {
      title: '할 일 수정',
      onPress: () => {
        if (todo) {
          setTodoList(todo);
          setIsEditMode(true);
          navigation.navigate('MOIM_CREATE_TODO', {
            id: moimId,
          });
        }
      },
    },
    {
      title: '할 일 삭제',
      onPress: () => {
        deleteTodoMutation.mutate(
          {moimId, todoId},
          {
            onSuccess: () => {
              navigation.goBack();
            },
          },
        );
      },
    },
  ];

  const handlePressRightIcon = () => {
    setIsPopOverOpen(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-col items-center">
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
          <View className="flex-1">
            <ParticipantList moimId={moimId} todoId={todoId} />
          </View>
        </View>
      </View>
      <PopoverMenu
        menu={PostMyMenuList}
        isPopover={isPopOverOpen}
        onPress={() => setIsPopOverOpen(prev => !prev)}>
        <TouchableOpacity
          className="relative"
          onPress={() => setIsPopOverOpen(prev => !prev)}>
          <Ionicons name="ellipsis-vertical" size={20} color={'#C9CCD1'} />
        </TouchableOpacity>
      </PopoverMenu>
    </SafeAreaView>
  );
}
