import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MoimSearchScreenSkeleton = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 6,
        alignSelf: 'center',
      }}>
      <SkeletonPlaceholder borderRadius={10}>
        <View style={{width: 55, height: 55}} />
      </SkeletonPlaceholder>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 20,
          gap: 5,
        }}>
        <SkeletonPlaceholder borderRadius={10}>
          <View style={{width: 100, height: 15}} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder borderRadius={10}>
          <View style={{width: 120, height: 15}} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder borderRadius={10}>
          <View style={{width: 200, height: 10, marginTop: 5}} />
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

export default MoimSearchScreenSkeleton;
