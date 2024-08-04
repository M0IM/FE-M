import {FlatList} from 'react-native';

import {Typography} from '../../@common/Typography/Typography.tsx';
import SpaceCard from '../../home/SpaceCard/SpaceCard.tsx';
import {myMoim} from 'screens/FeedTabScreens/FeedHomeScreen.tsx';

export default function MoimMyEvent() {
  return (
    <>
      <Typography className="text-lg" fontWeight={'BOLD'}>
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
    </>
  );
}
