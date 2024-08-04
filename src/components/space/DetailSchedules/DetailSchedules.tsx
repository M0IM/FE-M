import { Typography } from 'components/@common/Typography/Typography';
import { View, FlatList } from 'react-native';

// TODO: 예시 타입입니다. 추후에 변경 예정
type DetailScheduleType = {
    startTime: string;
    title: string;
}

interface DetailSchedulesProps {
    detailSchedules: DetailScheduleType[];
    type?: 'full' | 'preview';
}

const DetailSchedules = ({
    detailSchedules,
    type = 'full'
}: DetailSchedulesProps) => {
    const scheduleList = detailSchedules.length > 6 ? detailSchedules.slice(0, 5) : detailSchedules;

    return (
        <View className='flex flex-row'>
            <View className='w-[4px] h-full rounded-md bg-main mr-5' />
            <FlatList 
                data={type === 'full' ? detailSchedules : scheduleList}
                renderItem={({item, index}) => (
                    <View className='flex flex-row' key={index}>
                        <Typography fontWeight='MEDIUM' className='text-gray-500 text-xs mr-5'>{item.startTime}</Typography>
                        <Typography fontWeight='MEDIUM' className='text-gray-500 text-xs'>{item.title}</Typography>
                    </View>
                )}
                ItemSeparatorComponent={() => <View className='h-[12px]' />}
            />
        </View>
    );
};

export default DetailSchedules;