import {ScreenContainer} from 'components/ScreenContainer.tsx';
import RecommendBar from 'components/home/RecommendBar/RecommendBar.tsx';
import MoimScheduleEvent from 'components/screens/FeedTabScreens/MoimScheduleEvent.tsx';
import MoimMyEvent from 'components/screens/FeedTabScreens/MoimMyEvent.tsx';
import MoimHappeningEvent from 'components/screens/FeedTabScreens/MoimHappeningEvent.tsx';
import MoimRecommendationEvent from 'components/screens/FeedTabScreens/MoimRecommendationEvent.tsx';
import MoimIntroduceEvent from 'components/screens/FeedTabScreens/MoimIntroduceEvent.tsx';
import FloatingButton from 'components/@common/FloatingButton/FloatingButton';
import {HomeStackNavigationProp} from 'navigators/types';

export const schedules = [
  {
    id: 1,
    date: '2024년 07월 24일 오후 5:30',
    schedule: '매주 월요일 정기 스터디스터디스터디스터디',
    spaceName: '우리 동네 배드민턴',
    time: '3시간 후',
  },
  {
    id: 2,
    date: '2024년 08월 01일 오후 3:00',
    schedule: '매주 수요일 테니스 클럽',
    spaceName: '공원 테니스장',
    time: '1시간 후',
  },
];
export const myMoim = [
  {
    id: 1,
    spaceName: '우리 동네 배드민턴',
  },
  {
    id: 2,
    spaceName: '산속의 조용한 쉼터',
    uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 3,
    spaceName: '도시 속 작은 공원',
    uri: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 4,
    spaceName: '해변의 일출',
  },
  {
    id: 5,
    spaceName: '고즈넉한 도서관',
  },
];
export const spaceCard = [
  {
    id: 1,
    memberCount: 20,
    region: '서울',
    spaceImg:
      'https://images.unsplash.com/photo-1721760887035-8b65f87c5c9b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fCVFQiVCMCVCMCVFQiU5MyU5QyVFQiVBRiVCQyVFRCU4NCVCNHxlbnwwfHwwfHx8MA%3D%3D',
    spaceName: '우리 동네 배드민턴',
  },
  {
    id: 2,
    memberCount: 15,
    region: '부산',
    spaceName: '부산 배드민턴 클럽',
  },
  {
    id: 3,
    memberCount: 10,
    region: '인천',
    spaceName: '인천 셔틀콕',
  },
  {
    id: 4,
    memberCount: 25,
    region: '대구',
    spaceName: '대구 파워 배드민턴',
  },
  {
    id: 5,
    memberCount: 18,
    region: '광주',
    spaceImg:
      'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhZG1pbnRvbnxlbnwwfHwwfHx8MA%3D%3D',
    spaceName: '광주 스매시',
  },
];
export const introduceMoim = [
  {
    id: 1,
    thumbnail:
      'https://plus.unsplash.com/premium_photo-1673545660068-c593bff86574?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    spaceImg:
      'https://images.unsplash.com/photo-1706210063693-51cec7c4c757?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    spaceName: '사자 방생 모임',
  },
  {
    id: 2,
    thumbnail:
      'https://images.unsplash.com/photo-1706210063693-51cec7c4c757?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    spaceImg:
      'https://plus.unsplash.com/premium_photo-1675365780148-a00379c54123?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    spaceName: '커비와 별따러가는 모임',
  },
  {
    id: 3,
    thumbnail:
      'https://plus.unsplash.com/premium_photo-1673884221451-2cf2553c65a8?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    spaceImg:
      'https://plus.unsplash.com/premium_photo-1673884221451-2cf2553c65a8?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    spaceName: '커피 한잔 할래요? 싫어요 야호야호야호',
  },
  {
    id: 4,
    thumbnail:
      'https://images.unsplash.com/photo-1719937050445-098888c0625e?q=80&w=2396&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    spaceImg:
      'https://images.unsplash.com/photo-1719937050445-098888c0625e?q=80&w=2396&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    spaceName: '해킹 모임',
  },
  {
    id: 5,
    thumbnail: 'https://example.com/image6.jpg',
    // spaceImg: 'https://example.com/space5.jpg',
    spaceName: 'Astro Field',
  },
  {
    id: 6,
    thumbnail: 'https://example.com/image6.jpg',
    // spaceImg is optional and omitted here
    spaceName: 'Comet Hub',
  },
];

interface FeedHomeScreenProps {
  navigation: HomeStackNavigationProp;
}

export default function FeedHomeScreen({navigation}: FeedHomeScreenProps) {
  return (
    <>
      <ScreenContainer loading={false}>
        <MoimScheduleEvent />
        <MoimMyEvent />
        <RecommendBar username={'매튜'} />
        <MoimHappeningEvent />
        <MoimRecommendationEvent />
        <MoimIntroduceEvent />
      </ScreenContainer>
      <FloatingButton onPress={() => navigation.navigate('MOIM_CREATE')} />
    </>
  );
}
