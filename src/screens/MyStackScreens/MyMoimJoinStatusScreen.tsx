import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import { Image, Pressable, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Label from 'components/@common/Label/Label';
import { HomeStackNavigationProp } from 'navigators/types';

const ActiveMoimData = [
  {
    id: 1,
    title: '우리 동네 배드민턴',
    subTitle: '배드민턴도 열심히 해서 대회도 나가 강사 활동도 해봐요',
    category: '외국/언어',
    region: '서울',
    memberCount: 3,
    spaceImg: 'https://images.unsplash.com/photo-1719937206498-b31844530a96?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8'
  },
  {
    id: 2,
    title: '서울 영어 회화',
    subTitle: '영어 실력을 키워보아요',
    category: '외국/언어',
    region: '서울',
    memberCount: 10,
  },
  {
    id: 3,
    title: '강남 요가 클럽',
    subTitle: '편안한 요가와 함께 건강을 챙기세요',
    category: '운동/건강',
    region: '서울',
    memberCount: 15,
  },
  {
    id: 4,
    title: '서울 산책 모임',
    subTitle: '도심 속에서의 힐링 산책',
    category: '여가/취미',
    region: '서울',
    memberCount: 8,
  },
  {
    id: 5,
    title: 'IT 개발자 모임',
    subTitle: '최신 기술을 배우고 공유해요',
    category: '직업/기술',
    region: '서울',
    memberCount: 20,
  },
];

interface MyMoimJoinStatusScreenProps {
  navigation: HomeStackNavigationProp;
}

export default function MyMoimJoinStatusScreen({
  navigation
}: MyMoimJoinStatusScreenProps) {
  return (
    <ScreenContainer>
      {ActiveMoimData.map((item) => (
        <Pressable 
          key={item.id} 
          className='flex flex-row p-[6] h-[102] items-center active:bg-hover active:rounded-lg'
          onPress={() => navigation.navigate('MOIM_STACK', {
            screen: 'MOIM_SPACE',
            params: { id: item.id }
          })}
        >
          {item.spaceImg ? (
            <Image
              source={{uri: item.spaceImg}}
              width={55}
              height={55}
              className="rounded-lg"
            />
          ) : (
            <View className="flex flex-col items-center justify-center bg-gray-100 w-[55] h-[55] rounded-lg">
              <Ionicons name="home" size={20} color="#E9ECEF" />
            </View>
          )}
            <View className="flex flex-col w-[70%] ml-3 gap-y-0.5">
              <Typography
                fontWeight="BOLD"
                className="text-dark-800 text-base w-[90%]"
                numberOfLines={1}>
                {item.title}
              </Typography>
              <Typography
                fontWeight="BOLD"
                className="text-gray-400 text-xs w-[90%]"
                numberOfLines={1}>
                {item.subTitle}
              </Typography>
              <View className="flex flex-row gap-2">
                <Typography fontWeight="LIGHT" className="text-gray-500 text-xs">
                  {item.category}
                </Typography>
                <Typography
                  fontWeight="LIGHT"
                  className="text-gray-500 text-xs"
                  numberOfLines={1}>
                  {item.region}
                </Typography>
                <Typography fontWeight="LIGHT" className="text-gray-500 text-xs">
                  참여 인원 {item.memberCount}명
                </Typography>
              </View>
            </View>
            <Label label='신청' />
        </Pressable>
      ))}
    </ScreenContainer>
  );
}
