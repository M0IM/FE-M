import {View, Image, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {cva} from 'class-variance-authority';

import {cn} from 'utils';
import {Typography} from 'components/@common/Typography/Typography';
import DefaultIcon from 'components/@common/DefaultIcon/DefaultIcon';
import {MOIM_CATEGORY} from 'types/dtos/moim';
import {CATEGORIES_LIST} from 'constants/screens/MoimSearchScreen/CategoryList';

interface MoimImageBoxProps {
  backgroundImage?: string;
  memberCount?: number;
  category?: MOIM_CATEGORY;
  address?: string;
}

const MoimImageBox = ({
  backgroundImage,
  memberCount,
  category,
  address,
}: MoimImageBoxProps) => {
  const platform = Platform.OS;
  const slicedAddress = address?.split(' ')[0];

  return (
    <View className="flex flex-col items-center relative">
      {backgroundImage ? (
        <Image
          source={{uri: backgroundImage}}
          className="w-full h-[240px] rounded-tr-2xl rounded-tl-2xl"
        />
      ) : (
        <View className="flex flex-col items-center w-full h-[240px] bg-gray-100 rounded-tr-2xl rounded-tl-2xl">
          <DefaultIcon height={50} width={50} className="mt-16" />
        </View>
      )}
      <LinearGradient
        colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
        className="w-full h-[70px] absolute bottom-0"
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
      />
      {/* TODO: 다음 버전에서 적용 */}
      {/* <View className='absolute top-28 right-2'>
                <TouchableOpacity className='p-2'>
                    <View className='flex flex-row items-center bg-black opacity-70 rounded-md p-2'>
                        <Typography fontWeight='BOLD' className='text-sm text-white mr-2'>모임 소개 영상</Typography>
                        <Ionicons name="play" color='#fff' size={15} />
                    </View>
                </TouchableOpacity>
            </View> */}
      <View className={cn(MoimImageBoxVaraint({platform}))}>
        <View className="flex flex-row items-center gap-x-7">
          <View className="flex flex-col items-center">
            <Typography fontWeight="LIGHT" className="text-gray-300 text-sm">
              인원 수
            </Typography>
            <Typography
              fontWeight="MEDIUM"
              className="text-gray-500 text-base mt-1">
              {memberCount}
            </Typography>
          </View>
          <View className="w-[1px] h-[30px] bg-gray-200" />
          <View className="flex flex-col items-center">
            <Typography fontWeight="LIGHT" className="text-gray-300 text-sm">
              분야
            </Typography>
            <Typography
              fontWeight="MEDIUM"
              className="text-gray-500 text-base mt-1">
              {category ? CATEGORIES_LIST[category] : ''}
            </Typography>
          </View>
          <View className="w-[1px] h-[30px] bg-gray-200" />
          <View className="flex flex-col items-center">
            <Typography fontWeight="LIGHT" className="text-gray-300 text-sm">
              활동 지역
            </Typography>
            <Typography
              fontWeight="MEDIUM"
              className="text-gray-500 text-base mt-1">
              {slicedAddress}
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};

const MoimImageBoxVaraint = cva(
  'flex items-center justify-center absolute bg-white shadow-lg w-[98%] h-[120px] rounded-full top-[170px] p-6',
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
  },
);

export default MoimImageBox;
