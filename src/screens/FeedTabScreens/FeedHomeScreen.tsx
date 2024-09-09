import {ScreenContainer} from 'components/ScreenContainer.tsx';
import MoimScheduleEvent from 'components/screens/FeedTabScreens/MoimScheduleEvent.tsx';
import MoimMyEvent from 'components/screens/FeedTabScreens/MoimMyEvent.tsx';
import MoimHappeningEvent from 'components/screens/FeedTabScreens/MoimHappeningEvent.tsx';
import MoimFeedPreview from 'components/screens/FeedTabScreens/MoimFeedPreview';
import {MoimWriteBar} from 'components/home/MoimWriteBar/MoimWriteBar.tsx';

import {HomeStackNavigationProp} from 'navigators/types';
import React, {useCallback, useState} from 'react';
import {RefreshControl} from 'react-native';

import {wait} from 'utils/wait';
import useMoimInfoStore from 'stores/useMoimInfoStore';
import {useFocusEffect} from '@react-navigation/native';

interface FeedHomeScreenProps {
  navigation: HomeStackNavigationProp;
}

export default function FeedHomeScreen({navigation}: FeedHomeScreenProps) {
  const {setMoinInfo} = useMoimInfoStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  // useEffect(() => {
  //   useSocketService.initializeSocket();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      setMoinInfo(null);
    }, [setMoinInfo]),
  );

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    wait(2000).then(() => setIsRefreshing(false));
  }, []);

  return (
    <>
      <ScreenContainer
        loading={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <MoimScheduleEvent isRefreshing={isRefreshing} />
        <MoimMyEvent isRefreshing={isRefreshing} navigation={navigation} />
        <MoimWriteBar onPress={() => navigation.navigate('MOIM_CREATE')} />
        {/*<RecommendBar />*/}
        <MoimHappeningEvent isRefreshing={isRefreshing} />
        <MoimFeedPreview isRefreshing={isRefreshing} />
        {/* <MoimRecommendationEvent /> */}
        {/* <MoimIntroduceEvent /> */}
      </ScreenContainer>
      {/*<FloatingButton onPress={() => navigation.navigate('MOIM_CREATE')} />*/}
    </>
  );
}
