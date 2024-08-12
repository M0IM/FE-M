import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import { RevokeMoimStackNavigatorProp } from 'navigators/types';
import { Image, Pressable, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ActiveMoimData = [
  {
    id: 1,
    title: '우리 동네 배드민턴',
    subTitle: '배드민턴도 열심히 해서 대회도 나가 강사 활동도 해봐요',
    category: '외국/언어',
    region: '서울',
    memberCount: 3,
    spaceImg: ''
  },
  {
    id: 2,
    title: '서울 영어 회화',
    subTitle: '영어 실력을 키워보아요',
    category: '외국/언어',
    region: '서울',
    memberCount: 10,
    spaceImg: ''
  },
  {
    id: 3,
    title: '강남 요가 클럽',
    subTitle: '편안한 요가와 함께 건강을 챙기세요',
    category: '운동/건강',
    region: '서울',
    memberCount: 15,
    spaceImg: ''
  },
];

interface RevokeMoimScreenProps {
  navigation: RevokeMoimStackNavigatorProp
}

export default function RevokeMoimScreen({ navigation }: RevokeMoimScreenProps) {
  return (
    <ScreenContainer>
      <Typography fontWeight={'BOLD'} className='text-lg mt-4'>어떤 모임을 탈퇴하시겠어요?</Typography>
      <View className='flex flex-col gap-y-3'>
        {ActiveMoimData.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.navigate('REVOKE_MOIM_DETAIL', { id: item.id })}
            className="flex flex-row p-[6] h-[102] items-center active:bg-hover active:rounded-lg">
            {item?.spaceImg ? (
              <Image
                source={{uri: item?.spaceImg}}
                width={55}
                height={55}
                className="rounded-lg"
              />
            ) : (
              <View className="flex flex-col items-center justify-center bg-gray-100 w-[55] h-[55] rounded-lg">
                <Ionicons name="home" size={20} color="#E9ECEF" />
              </View>
            )}
            <View className="flex flex-col ml-3 gap-y-0.5">
              <Typography
                fontWeight="BOLD"
                className="text-dark-800 text-base w-[300]"
                numberOfLines={1}>
                {item?.title}
              </Typography>
              <Typography
                fontWeight="BOLD"
                className="text-gray-400 text-xs w-[300]"
                numberOfLines={1}>
                {item?.subTitle}
              </Typography>
              <View className="flex flex-row gap-2">
                <Typography fontWeight="LIGHT" className="text-gray-500 text-xs">
                  {item?.category}
                </Typography>
                <Typography
                  fontWeight="LIGHT"
                  className="text-gray-500 text-xs"
                  numberOfLines={1}>
                  {item?.region}
                </Typography>
                <Typography fontWeight="LIGHT" className="text-gray-500 text-xs">
                  참여 인원 {item?.memberCount}명
                </Typography>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}
