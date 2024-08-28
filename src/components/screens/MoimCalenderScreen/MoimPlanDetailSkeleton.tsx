import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MoimPlanDetailSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={15}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            padding: 20,
            height: '100%',
          }}>
          <View style={{width: '100%', height: 150}} />
          <View style={{width: '100%', height: 150}} />
          <View style={{width: '100%', height: 150}} />
          <View style={{width: '100%', height: 50, marginTop: 'auto'}} />
        </View>
      </SkeletonPlaceholder>
    </>
  );
};

export default MoimPlanDetailSkeleton;
