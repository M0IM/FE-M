import { cva } from 'class-variance-authority';
import { Typography } from 'components/@common/Typography/Typography';
import { View, Image, Platform, TouchableOpacity } from 'react-native';
import { cn } from 'utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

const testImage = "https://images.unsplash.com/photo-1711486107626-855a7a5ca7f0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D";

const MoimImageBox = () => {
    const platform = Platform.OS;
    return (
        <View className='flex flex-col items-center relative'>
            <Image source={{uri: testImage}} className='w-full h-[240px] rounded-tr-2xl rounded-tl-2xl'/>
            <View className='absolute top-28 right-2'>
                <TouchableOpacity className='p-2'>
                    <View className='flex flex-row items-center bg-black opacity-70 rounded-md p-2'>
                        <Typography fontWeight='BOLD' className='text-sm text-white mr-2'>모임 소개 영상</Typography>
                        <Ionicons name="play" color='#fff' size={15} />
                    </View>
                </TouchableOpacity>
            </View>
            <View className={cn(MoimImageBoxVaraint({platform}))}>
                <View className='flex flex-row items-center gap-x-9'>
                    <View className='flex flex-col items-center'>
                        <Typography fontWeight='LIGHT' className='text-gray-300 text-sm'>인원 수</Typography>
                        <Typography fontWeight='MEDIUM' className='text-gray-500 text-base mt-1'>120</Typography>
                    </View>
                    <View className='w-[1px] h-[30px] bg-gray-200' />
                    <View className='flex flex-col items-center'>
                        <Typography fontWeight='LIGHT' className='text-gray-300 text-sm'>분야</Typography>
                        <Typography fontWeight='MEDIUM' className='text-gray-500 text-base mt-1'>IT/개발</Typography>
                    </View>
                    <View className='w-[1px] h-[30px] bg-gray-200' />
                    <View className='flex flex-col items-center'>
                        <Typography fontWeight='LIGHT' className='text-gray-300 text-sm'>활동 지역</Typography>
                        <Typography fontWeight='MEDIUM' className='text-gray-500 text-base mt-1'>서울</Typography>
                    </View>
                </View>
            </View>
        </View>
    );
};

const MoimImageBoxVaraint = cva('flex items-center justify-center absolute bg-white shadow-lg w-[98%] h-[120px] rounded-full top-[170px] p-6', {
    variants: {
        platform: {
          ios: 'shadow-md shadow-gray-200',
          android: 'elevation-lg shadow-gray-300',
          windows: 'shadow-md shadow-gray-200',
          macos: 'shadow-md shadow-gray-200',
          web: 'shadow-md shadow-gray-200',
        },
      },
});

export default MoimImageBox;