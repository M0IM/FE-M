import { Typography } from 'components/@common/Typography/Typography';
import { ScreenContainer } from 'components/ScreenContainer';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { detailDate } from 'utils';

const alertList = [
    {
        id: 1,
        title: '새로운 댓글이 달렸습니다.',
        createdAt: '2024-08-15T16:27:09.210Z',
        content: '매주 월요일 스터디를 위해 워크북을 합시다.',
    },
    {
        id: 2,
        title: '새로운 댓글이 달렸습니다.',
        createdAt: '2024-08-15T16:27:09.210Z',
        content: '매주 월요일 스터디를 위해 워크북을 합시다.',
    },
    {
        id: 3,
        title: '새로운 댓글이 달렸습니다.',
        createdAt: '2024-08-15T16:27:09.210Z',
        content: '매주 월요일 스터디를 위해 워크북을 합시다.',
    },
    {
        id: 4,
        title: '새로운 댓글이 달렸습니다.',
        createdAt: '2024-08-15T16:27:09.210Z',
        content: '매주 월요일 스터디를 위해 워크북을 합시다.',
    },
    {
        id: 5,
        title: '새로운 댓글이 달렸습니다.',
        createdAt: '2024-08-15T16:27:09.210Z',
        content: '매주 월요일 스터디를 위해 워크북을 합시다.',
    },
];

const PushAlertScreen = () => {
    return (
        <ScreenContainer>
        <TouchableOpacity activeOpacity={0.8}>
            <Typography fontWeight='BOLD' className='text-main text-sm underline mt-4'>전체 삭제</Typography>
        </TouchableOpacity>

        {alertList.length > 0 ? alertList.map((item) => (
            <TouchableOpacity key={item.id} activeOpacity={0.8} className='flex flex-row items-center bg-gray-100 py-6 px-4 rounded-2xl'>
                <View className='bg-gray-200 items-center justify-center p-2 rounded-full w-[50] h-[50]'>
                    <Ionicons name="notifications-outline" size={24} color={'#fff'} />
                </View>
                <View className='flex flex-col gap-y-0.5 ml-4'>
                    <Typography fontWeight='BOLD' className='text-sm text-dark-800'>{item.title}</Typography>
                    <Typography fontWeight='MEDIUM' className='text-xs text-gray-300'>{detailDate(new Date(item.createdAt))}</Typography>
                    <Typography fontWeight='MEDIUM' className='text-sm text-dark-800 pt-1 max-w-[95%]' numberOfLines={1}>매주 월요일 스터디를 위해 워크북을 합시다.</Typography>
                </View>
            </TouchableOpacity>
        )) : (
            <View className='flex flex-row items-center justify-center bg-gray-100 py-8 px-4 rounded-2xl'>
                <Typography fontWeight='BOLD' className='text-gray-300 text-base'>새로운 알림이 없습니다.</Typography>
            </View>
        )}
        </ScreenContainer>
    );
};

export default PushAlertScreen;