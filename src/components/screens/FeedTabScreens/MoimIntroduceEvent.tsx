import {FlatList} from 'react-native';

import {Typography} from '../../@common/Typography/Typography.tsx';
import ThumbnailBox from '../../home/ThumbnailBox/ThumbnailBox.tsx';
import {introduceMoim} from 'screens/FeedTabScreens/FeedHomeScreen.tsx';

export default function MoimIntroduceEvent() {
  return (
    <>
      <Typography className="text-lg" fontWeight={'BOLD'}>
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
    </>
  );
}
