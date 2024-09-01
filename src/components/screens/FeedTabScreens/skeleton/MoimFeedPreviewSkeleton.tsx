import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MoimFeedPreviewSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={30}>
        <View style={{width: '100%', height: 200}} />
      </SkeletonPlaceholder>
    </>
  );
};

export default MoimFeedPreviewSkeleton;
