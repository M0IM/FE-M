import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {cva} from 'class-variance-authority';
import {cn} from 'utils/cn.ts';
import {TPlanListDTO} from 'types/dtos/calendar.ts';
import {getMonthYearDetails} from 'utils';
import {Typography} from '../../@common/Typography/Typography.tsx';
import useDeleteMyCalendarSchedule from 'hooks/queries/CalendarHomeScreen/useDeleteMyCalendarSchedule.ts';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';
import {CalendarStackNavigationProp} from 'navigators/types';
import useMyCalendarStore from 'stores/useMyCalendarStore.ts';

interface ICalendarEventProps {
  post: TPlanListDTO;
}

export function CalendarEvent({post, ...props}: ICalendarEventProps) {
  const platform = Platform.OS;
  const {month, year, day} = getMonthYearDetails(new Date(post.time));
  const {mutate} = useDeleteMyCalendarSchedule();
  const navigation = useNavigation<CalendarStackNavigationProp>();
  const {setMyCalendar, setIsEditMode} = useMyCalendarStore();

  const handlePressDeleteButton = () => {
    mutate(post.planId, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['myCalendar']});
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
            'bg-error rounded-2xl flex-1 h-full items-center justify-center text-white'
          }>
          <Typography className={'text-white'} fontWeight={'MEDIUM'}>
            삭제
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressModifyButton}
          className={
            'bg-gray-400 rounded-2xl flex-1 h-full items-center justify-center text-white'
          }>
          <Typography className={'text-white'} fontWeight={'MEDIUM'}>
            수정
          </Typography>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      containerStyle={{
        height: 80,
        justifyContent: 'center',
        marginTop: 10,
      }}
      dragOffsetFromLeftEdge={10}
      renderRightActions={rightSwipe}>
      <TouchableOpacity
        {...props}
        activeOpacity={0.5}
        className="flex-row my-3 items-center justify-center w-[323px] h-[88px]"
        key={post.planId}>
        <View className="bg-main w-1 rounded-l-full h-full z-10" />
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
    </Swipeable>
  );
}

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
