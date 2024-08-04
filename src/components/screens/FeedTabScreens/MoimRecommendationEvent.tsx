import {FlatList} from 'react-native';

import {spaceCard} from 'screens/FeedTabScreens/FeedHomeScreen.tsx';
import {Typography} from '../../@common/Typography/Typography.tsx';
import SpacePreviewCard from '../../home/SpacePreviewCard/SpacePreviewCard.tsx';

export default function MoimRecommendationEvent() {
  return (
    <>
      <Typography className="text-lg" fontWeight={'BOLD'}>
        이런 모임은 어때요?
      </Typography>
      <FlatList
        horizontal={true}
        data={spaceCard}
        renderItem={({item}) => (
          <SpacePreviewCard
            memberCount={item.memberCount}
            region={item.region}
            spaceImg={item.spaceImg}
            spaceName={item.spaceName}
          />
        )}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{
          gap: 10,
        }}
      />
    </>
  );
}
