import {FlatList, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MoimScheduleEventSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder borderRadius={10}>
        <View style={{width: 120, height: 25}} />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={10}>
        <View style={{width: 230, height: 25, marginTop: 7}} />
      </SkeletonPlaceholder>
      <FlatList
        scrollEnabled={false}
        horizontal
        data={Array(2).fill(null)}
        renderItem={() => (
          <SkeletonPlaceholder borderRadius={20}>
            <View style={{width: 240, height: 160, marginTop: 20}} />
          </SkeletonPlaceholder>
        )}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
      />
    </>
  );
};

export default MoimScheduleEventSkeleton;
