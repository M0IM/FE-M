import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MoimDetailSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={70}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              height: 240,
              backgroundColor: '#f3f4f6',
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
            }}
          />
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={20}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            marginTop: 20,
            padding: 20,
          }}>
          <View style={{width: 100, height: 30}} />
          <View style={{width: '100%', height: 200}} />
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={20}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <View style={{width: 100, height: 100}} />
          <View style={{width: 100, height: 100}} />
          <View style={{width: 100, height: 100}} />
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={20}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            padding: 20,
          }}>
          <View style={{width: '100%', height: 100}} />
        </View>
      </SkeletonPlaceholder>
    </>
  );
};

export default MoimDetailSkeleton;
