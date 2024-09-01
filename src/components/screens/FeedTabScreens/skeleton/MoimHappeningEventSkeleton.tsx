import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MoimHappeningEventSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={20}>
        <View style={{width: '100%', height: 300}} />
      </SkeletonPlaceholder>
    </>
  );
};

export default MoimHappeningEventSkeleton;
