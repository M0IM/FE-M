import {FlatList, View} from 'react-native';
import {Typography} from '../../@common/Typography/Typography.tsx';
import SpaceCard from '../../home/SpaceCard/SpaceCard.tsx';
import {myMoim} from 'screens/FeedTabScreens/FeedHomeScreen.tsx';
import { HomeStackNavigationProp } from 'navigators/types/index.ts';

interface MoimMyEventProps {
  navigation: HomeStackNavigationProp;
}

export default function MoimMyEvent({ navigation }: MoimMyEventProps) {
  return (
    <View className='flex flex-col'>
      <Typography className="text-lg mb-4" fontWeight={'BOLD'}>
        내 모임
      </Typography>
      <FlatList
        data={myMoim}
        horizontal={true}
        renderItem={({item}) => (
          <SpaceCard
            onPress={() =>
              navigation.navigate('MOIM_STACK', {
                screen: 'MOIM_SPACE',
                params: {
                  id: item.id,
                },
              })
            }
            spaceName={item.spaceName}
            uri={item.uri} 
          />
        )}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{
          gap: 10,
        }}
      />
    </View>
  );
}
