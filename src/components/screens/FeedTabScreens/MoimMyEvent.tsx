import {FlatList, View} from 'react-native';

import {Typography} from '../../@common/Typography/Typography.tsx';
import SpaceCard from '../../home/SpaceCard/SpaceCard.tsx';
import {myMoim} from 'screens/FeedTabScreens/FeedHomeScreen.tsx';

export default function MoimMyEvent() {
  return (
    <View className='flex flex-col'>
      <Typography className="text-lg mb-4" fontWeight={'BOLD'}>
        내 모임
      </Typography>
      <FlatList
        data={myMoim}
        horizontal={true}
        renderItem={({item}) => (
          <SpaceCard spaceName={item.spaceName} uri={item.uri} />
        )}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{
          gap: 10,
        }}
      />
    </View>
  );
}
