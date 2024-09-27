import {View} from 'react-native';

// import {spaceCard} from 'screens/FeedTabScreens/FeedHomeScreen.tsx';
import {Typography} from '../../@common/Typography/Typography.tsx';
// import SpacePreviewCard from '../../home/SpacePreviewCard/SpacePreviewCard.tsx';

export default function MoimRecommendationEvent() {
  return (
    <View className="flex flex-col">
      <Typography className="text-lg mb-4 text-dark-800" fontWeight={'BOLD'}>
        이런 모임은 어때요?
      </Typography>
      {/* {spaceCard.map((item, _) => (
        <View key={item.id} className="py-1">
          <SpacePreviewCard
            memberCount={item.memberCount}
            region={item.region}
            spaceImg={item.spaceImg}
            spaceName={item.spaceName}
          />
        </View>
      ))} */}
    </View>
  );
}
