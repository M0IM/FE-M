import { cva } from 'class-variance-authority';
import { Typography } from 'components/@common/Typography/Typography';
import { View, Platform, FlatList } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { cn } from 'utils';


const infoList = [
    {
        text: '평균 연령',
        data: '24세'
    },
    {
        text: '이번달 일정',
        data: '6개'
    },
    {
        text: '모임 후기',
        data: '70개'
    }
];

const data = [
	{
		value: 3,
		color: '#ADD8E6',
		text: '남',
	},
	{
		value: 2,
		color: '#FFB6C1',
		text: '여',
	},
];

const MoimDashboardContainer = () => {
    const platform = Platform.OS;
    return (
        <View className='flex flex-col p-6'> 
            <View className='flex flex-row'>
                <FlatList 
                    horizontal
                    data={infoList}
                    contentContainerStyle={{paddingBottom: 20, width: '100%', justifyContent: 'space-around'}}
                    renderItem={({item}) => (
                        <View
                            className={cn(MoimDashboardContainerVariant({platform}))}>
                            <Typography
                                fontWeight="MEDIUM"
                                className="mt-2 text-xs text-gray-300"
                                numberOfLines={1}
                            >
                                {item.text}
                            </Typography>
                            <Typography
                                fontWeight="MEDIUM"
                                className="mt-2 text-lg text-gray-600 ml-auto"
                                numberOfLines={1}
                            >
                                {item.data}
                            </Typography>
                        </View>
                    )}
                />
            </View>
            <View className="flex-row justify-center items-center h-[150px] p-4 bg-white shadow-md shadow-gray-200 rounded-2xl">
                <Typography fontWeight='MEDIUM' className="mb-20 text-xs text-gray-300 mr-5">성비</Typography>
                <PieChart
                    data={data}
                    donut
                    innerRadius={30}
                    radius={50}
                    textColor="black"
                    showValuesAsLabels
                    labelsPosition="outward"
                />

                <View className="h-full flex-1 justify-center gap-2 w-full">
                    <View className="flex-row justify-around">
                        <Typography fontWeight='MEDIUM' className="text-gray-300">여</Typography>
                        <Typography fontWeight='MEDIUM' className="text-gray-500">2 (24명)</Typography>
                    </View>
                    <View className="flex-row justify-around">
                        <Typography fontWeight='MEDIUM' className="text-gray-300">남</Typography>
                        <Typography fontWeight='MEDIUM' className="text-gray-500">8 (96명)</Typography>
                    </View>
                    <View className="flex-row justify-around">
                        <Typography fontWeight='MEDIUM' className="text-gray-300">전체</Typography>
                        <Typography fontWeight='MEDIUM' className="text-gray-500">120명</Typography>
                    </View>
                </View>
            </View>
        </View>
    );
};

const MoimDashboardContainerVariant = cva(
    'flex flex-col p-4 justify-between bg-white w-[100] h-[100] rounded-3xl', 
    {
        variants: {
            platform: {
                ios: 'shadow-md shadow-gray-200',
                android: 'elevation-lg shadow-gray-300',
                windows: 'shadow-md shadow-gray-200',
                macos: 'shadow-md shadow-gray-200',
                web: 'shadow-md shadow-gray-200',
            },
        },
    }
);

export default MoimDashboardContainer;