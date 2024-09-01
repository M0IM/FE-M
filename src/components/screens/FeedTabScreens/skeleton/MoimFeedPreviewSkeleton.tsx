import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MoimFeedPreviewSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={10}>
        <View style={{width: '100%', height: 300}} />
      </SkeletonPlaceholder>
    </>
  );
};

export default MoimFeedPreviewSkeleton;
