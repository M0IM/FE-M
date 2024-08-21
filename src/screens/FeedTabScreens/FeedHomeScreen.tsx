import {ScreenContainer} from 'components/ScreenContainer.tsx';
import RecommendBar from 'components/home/RecommendBar/RecommendBar.tsx';
import MoimScheduleEvent from 'components/screens/FeedTabScreens/MoimScheduleEvent.tsx';
import MoimMyEvent from 'components/screens/FeedTabScreens/MoimMyEvent.tsx';
import MoimHappeningEvent from 'components/screens/FeedTabScreens/MoimHappeningEvent.tsx';
import MoimRecommendationEvent from 'components/screens/FeedTabScreens/MoimRecommendationEvent.tsx';
import MoimIntroduceEvent from 'components/screens/FeedTabScreens/MoimIntroduceEvent.tsx';
import FloatingButton from 'components/@common/FloatingButton/FloatingButton';
import {HomeStackNavigationProp} from 'navigators/types';
import useSocket from '../../hooks/useSocket.ts';
import {useEffect} from 'react';
import useSocketService from '../../hooks/useSocketService.ts';

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

interface FeedHomeScreenProps {
  navigation: HomeStackNavigationProp;
}

export default function FeedHomeScreen({navigation}: FeedHomeScreenProps) {
  useEffect(() => {
    useSocketService.initializeSocket();
  }, []);
  return (
    <>
      <ScreenContainer loading={false}>
        <MoimScheduleEvent />
        <MoimMyEvent navigation={navigation} />
        <RecommendBar username={'매튜'} />
        <MoimHappeningEvent />
        <MoimRecommendationEvent />
        <MoimIntroduceEvent />
      </ScreenContainer>
      <FloatingButton onPress={() => navigation.navigate('MOIM_CREATE')} />
    </>
  );
}
