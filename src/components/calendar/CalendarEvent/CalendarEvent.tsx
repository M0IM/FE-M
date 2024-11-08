import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import {cva} from 'class-variance-authority';
import {cn} from 'utils/cn.ts';
import {TPlanListDTO} from 'types/dtos/calendar.ts';
import {getMonthYearDetails} from 'utils';
import {Typography} from '../../@common/Typography/Typography.tsx';
import useDeleteMyCalendarSchedule from 'hooks/queries/CalendarHomeScreen/useDeleteMyCalendarSchedule.ts';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';
import {CalendarStackNavigationProp} from 'navigators/types';
import useMyCalendarStore from 'stores/useMyCalendarStore.ts';
import Toast from 'react-native-toast-message';

interface ICalendarEventProps {
  post: TPlanListDTO;
  onPress?: () => void;
}

export function CalendarEvent({post, onPress, ...props}: ICalendarEventProps) {
  const platform = Platform.OS;
  const {month, year, day} = getMonthYearDetails(new Date(post.time));
  const {mutate} = useDeleteMyCalendarSchedule();
  const navigation = useNavigation<CalendarStackNavigationProp>();
  const {setMyCalendar, setIsEditMode} = useMyCalendarStore();
  const handlePressDeleteButton = () => {
    mutate(post.planId, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['calendar']});
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: error.response?.data.message,
          visibilityTime: 2000,
          position: 'bottom',
        });
      },
    });
  };

  const handlePressModifyButton = () => {
    setMyCalendar(post);
    setIsEditMode(true);
    navigation.navigate('CALENDAR_MODIFY', {
      id: post.planId,
    });
  };

  const rightSwipe = () => {
    return (
      <View
        className={
          'flex-row w-[50%] h-full items-center justify-center gap-x-2'
        }>
        <TouchableOpacity
          onPress={handlePressDeleteButton}
          className={
            'bg-error rounded-xl flex-1 h-[90%] items-center justify-center text-white'
          }>
          <Typography className={'text-white'} fontWeight={'BOLD'}>
            삭제
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressModifyButton}
          className={
            'bg-gray-400 rounded-xl flex-1 h-[90%] items-center justify-center text-white'
          }>
          <Typography className={'text-white'} fontWeight={'BOLD'}>
            수정
          </Typography>
        </TouchableOpacity>
      </View>
    );
  };

  switch (post.planType) {
    case 'TODO_PLAN':
      return (
        <TouchableOpacity
          onPress={onPress}
          {...props}
          activeOpacity={0.5}
          className="flex-row mt-[10px] items-center justify-center w-[323px] h-[88px] "
          key={post.planId}>
          <View className="bg-warning w-1 rounded-l-full h-[90%] z-10" />

          <View className={cn(CalenderEventVariant({platform}))}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-dark-800 font-bold text-base mb-1">
              {post.title}
            </Text>
            <View className="mt-1">
              <Text className="text-xs text-gray-400">
                {year}년 {month}월 {day}일
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    case 'MOIM_PLAN':
      return (
        <TouchableOpacity
          onPress={onPress}
          {...props}
          activeOpacity={0.5}
          className="flex-row mt-[10px] items-center justify-center w-[323px] h-[88px] "
          key={post.planId}>
          <View className="bg-error w-1 rounded-l-full h-[90%] z-10" />

          <View className={cn(CalenderEventVariant({platform}))}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-dark-800 font-bold text-base mb-1">
              {post.title}
            </Text>
            <View className="mt-1">
              <Text className="text-xs text-gray-400">
                {year}년 {month}월 {day}일
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
  }

  return (
    <View className={cn(ShadowVariant({platform}))}>
      <Swipeable
        containerStyle={{
          height: 80,
          justifyContent: 'center',
          marginTop: 10,
        }}
        dragOffsetFromLeftEdge={10}
        renderRightActions={rightSwipe}>
        <TouchableOpacity
          onPress={onPress}
          {...props}
          activeOpacity={0.5}
          className="flex-row items-center justify-center w-[323px] h-[88px]"
          key={post.planId}>
          {/* 녹색: 개인 일정, 빨간색: 모임 일정, 노란색: 투두 일정 */}
          {post.planType === 'INDIVIDUAL_PLAN' && (
            <View className="bg-main w-1 rounded-l-full h-[90%] z-10" />
          )}
          <View className="bg-white p-4 rounded-r-2xl flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-dark-800 font-bold text-base mb-1">
              {post.title}
            </Text>
            <View className="mt-1">
              <Text className="text-xs text-gray-400">
                {year}년 {month}월 {day}일
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
}

const ShadowVariant = cva('mt-[5px] w-[323px] h-[88px]', {
  variants: {
    platform: {
      ios: 'shadow shadow-gray-200',
      android: 'elevation-lg shadow-gray-300',
      windows: 'shadow shadow-gray-200',
      macos: 'shadow shadow-gray-200',
      web: 'shadow shadow-gray-200',
    },
  },
});

const CalenderEventVariant = cva('bg-white p-4 rounded-r-2xl flex-1', {
  variants: {
    platform: {
      ios: 'shadow shadow-gray-200',
      android: 'elevation-lg shadow-gray-300',
      windows: 'shadow shadow-gray-200',
      macos: 'shadow shadow-gray-200',
      web: 'shadow shadow-gray-200',
    },
  },
});
