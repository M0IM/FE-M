import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const PostInfoSkeleton = () => {
  return (
    <View
      style={{display: 'flex', flexDirection: 'column', padding: 20, gap: 30}}>
      <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
        <SkeletonPlaceholder borderRadius={999}>
          <View style={{width: 40, height: 40}} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder borderRadius={10}>
          <View style={{width: 200, height: 40}} />
        </SkeletonPlaceholder>
      </View>
      <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        <SkeletonPlaceholder borderRadius={10}>
          <View style={{width: '80%', height: 40}} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder borderRadius={10}>
          <View style={{width: '100%', height: 300}} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder borderRadius={10}>
          <View style={{width: '100%', height: 30, marginTop: 30}} />
        </SkeletonPlaceholder>
      </View>
      <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        {Array(3)
          .fill(null)
          .map((item, index) => (
            <SkeletonPlaceholder borderRadius={10} key={index}>
              <View style={{width: '100%', height: 100}} />
            </SkeletonPlaceholder>
          ))}
      </View>
    </View>
  );
};

export default PostInfoSkeleton;
