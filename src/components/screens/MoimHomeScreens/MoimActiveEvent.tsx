import {View} from 'react-native';
import {Typography} from '../../@common/Typography/Typography.tsx';
import {ActiveMoimCard} from '../../calendar/ActiveMoimCard.tsx';

const ActiveMoimData = [
  {
    id: 1,
    title: '우리 동네 배드민턴',
    subTitle: '배드민턴도 열심히 해서 대회도 나가 강사 활동도 해봐요',
    category: '외국/언어',
    region: '서울',
    memberCount: 3,
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

export default function MoimActiveEvent() {
  return (
    <>
      <View className="flex-row gap-x-3 mt-5 items-center">
        <Typography className="text-xl" fontWeight={'BOLD'}>
          내가 활동 중인 모임
        </Typography>
        <Typography className="text-gray-400 text-md" fontWeight={'MEDIUM'}>
          ({ActiveMoimData.length})
        </Typography>
      </View>
      {ActiveMoimData.map(
        ({id, title, subTitle, category, region, memberCount}) => {
          return (
            <ActiveMoimCard
              key={id}
              id={String(id)}
              title={title}
              subTitle={subTitle}
              category={category}
              region={region}
              memberCount={memberCount}
            />
          );
        },
      )}
    </>
  );
}
