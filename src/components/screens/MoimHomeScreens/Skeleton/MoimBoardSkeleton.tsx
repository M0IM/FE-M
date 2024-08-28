import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MoimBoardSkeleton = () => {
  return (
    <View
      style={{display: 'flex', flexDirection: 'column', gap: 10, padding: 10}}>
      <SkeletonPlaceholder borderRadius={10}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={{width: 70, height: 40}} />
          <View style={{width: 70, height: 40}} />
          <View style={{width: 70, height: 40}} />
          <View style={{width: 70, height: 40}} />
          <View style={{width: 70, height: 40}} />
        </View>
      </SkeletonPlaceholder>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          marginTop: 5,
        }}>
        {Array(5)
          .fill(null)
          .map((item, index) => (
            <SkeletonPlaceholder borderRadius={20} key={index}>
              <View style={{width: '100%', height: 200}}></View>
            </SkeletonPlaceholder>
          ))}
      </View>
    </View>
  );
};

export default MoimBoardSkeleton;
