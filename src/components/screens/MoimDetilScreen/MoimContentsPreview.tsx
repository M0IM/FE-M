import { Typography } from 'components/@common/Typography/Typography';
import SchedulePreviewCard from 'components/space/SchedulePreviewCard/SchedulePreviewCard';
import { View, FlatList } from 'react-native';

const participants = [
    {
        userId: 0,
        email: '',
        nickname: '',
        profileImg: 'https://plus.unsplash.com/premium_photo-1722010990368-6d8d02a00550?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2Nnx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        userId: 1,
        email: '',
        nickname: '',
        profileImg: 'https://plus.unsplash.com/premium_photo-1722010990368-6d8d02a00550?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2Nnx8fGVufDB8fHx8fA%3D%3D',
    }
];

const testList = [
    {
        title: '매주 월요일 정기 스터디',
        date: '2024년 07월 24일  오후 5 : 30',
        place: '상명대학교 G208',
        cost: 0,
        participants: participants
    },
    {
        title: '매주 월요일 정기 스터디',
        date: '2024년 07월 24일  오후 5 : 30',
        place: '상명대학교 G208',
        cost: 0,
        participants: participants
    },
    {
        title: '매주 월요일 정기 스터디',
        date: '2024년 07월 24일  오후 5 : 30',
        place: '상명대학교 G208',
        cost: 0,
        participants: participants
    },
    {
        title: '매주 월요일 정기 스터디',
        date: '2024년 07월 24일  오후 5 : 30',
        place: '상명대학교 G208',
        cost: 0,
        participants: participants
    }
];

const testPostData = [
    {
        title: '매주 월요일 정기 스터디',
        content: '여러분 무조건 참여해야 하는 활동 중 하나입니다. 따라서 워크북을 꾸준히 하시길 바랍니다.',
        date: '2024년 5월 17일 오후 2:00',
    },
    {
        title: '매주 월요일 정기 스터디',
        content: '여러분 무조건 참여해야 하는 활동 중 하나입니다. 따라서 워크북을 꾸준히 하시길 바랍니다.',
        date: '2024년 5월 17일 오후 2:00',
    },
    {
        title: '매주 월요일 정기 스터디',
        content: '여러분 무조건 참여해야 하는 활동 중 하나입니다. 따라서 워크북을 꾸준히 하시길 바랍니다.',
        date: '2024년 5월 17일 오후 2:00',
    }
];

const MoimContentsPreview = () => {
  return (
    <View className='flex flex-col p-3 px-6'>
        <View className='flex flex-col'>
            <Typography fontWeight='BOLD' className='text-xs text-gray-400'>예정된 일정</Typography>
            <FlatList
                horizontal
                data={testList}
                contentContainerStyle={{marginTop: 15}}
                renderItem={({item}) => (
                    <SchedulePreviewCard 
                        title={item.title}
                        date={item.date}
                        place={item.place}
                        cost={item.cost}
                        participants={item.participants}
                    />
                )}
                ItemSeparatorComponent={() => <View className='w-3' />}
            />
        </View>
        <View className='flex flex-col mt-10'>
            <Typography fontWeight='BOLD' className='text-xs text-gray-400 mb-4'>공지사항</Typography>
            {testPostData.map((item, index) => (
                <View key={index} className='p-5 border-gray-200 border-[0.5px] rounded-xl mb-4'>
                    <View className='flex flex-row'>
                        <Typography fontWeight='BOLD' className='text-dark-800 text-sm'>{item.title}</Typography>
                        <Typography fontWeight='BOLD' className='text-main text-sm ml-2'>N</Typography>
                    </View>
                    <Typography fontWeight='MEDIUM' className='text-dark-800 text-sm mt-1'>{item.content}</Typography>
                    <Typography fontWeight='MEDIUM' className='text-gray-300 text-xs mt-5'>{item.date}</Typography>
                </View>
            ))}
        </View>
    </View>
  );
};

export default MoimContentsPreview;