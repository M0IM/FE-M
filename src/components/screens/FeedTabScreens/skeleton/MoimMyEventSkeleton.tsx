import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MoimMyEventSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={40}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View style={{width: 120, height: 120}} />
          <View style={{width: 70, height: 20, marginTop: 10}} />
        </View>
      </SkeletonPlaceholder>
    </>
  );
};

export default MoimMyEventSkeleton;
