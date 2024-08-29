import {FlatList, View} from 'react-native';

import {Typography} from '../../@common/Typography/Typography.tsx';
import ThumbnailBox from '../../home/ThumbnailBox/ThumbnailBox.tsx';
import {introduceMoim} from 'screens/FeedTabScreens/FeedHomeScreen.tsx';

export default function MoimIntroduceEvent() {
  return (
    <View className='flex flex-col'>
      <Typography className="text-lg mb-4" fontWeight={'BOLD'}>
        우리 모임을 소개합니다 🔥
      </Typography>
      <FlatList
        horizontal={true}
        data={introduceMoim}
        renderItem={({item}) => (
          <ThumbnailBox
            thumbnail={item.thumbnail}
            spaceName={item.spaceName}
            spaceImg={item.spaceImg}
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
