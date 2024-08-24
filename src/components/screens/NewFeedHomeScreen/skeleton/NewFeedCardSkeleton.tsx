import {View} from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export function NewFeedCardSkeleton() {
  return (
    <>
      <SkeletonPlaceholder borderRadius={30}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: 40, height: 40, marginRight: 10}} />
          <SkeletonPlaceholder borderRadius={0}>
            <View style={{width: 300, height: 20}} />
          </SkeletonPlaceholder>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <View
          style={{
            width: '100%',
            aspectRatio: '4/3',
            marginVertical: 10,
          }}
        />
      </SkeletonPlaceholder>
      <View className="my-3">
        <SkeletonPlaceholder>
          <View
            style={{
              width: '100%',
              height: 80,
            }}
          />
        </SkeletonPlaceholder>
      </View>
    </>
  );
}
