// import Label from 'components/@common/Label/Label';
import {Typography} from 'components/@common/Typography/Typography';
import {Image, TouchableOpacity, View} from 'react-native';

const images = [
  {
    profileImg:
      'https://images.unsplash.com/photo-1722495102451-b570ef9cfd15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    profileImg:
      'https://images.unsplash.com/photo-1722495102451-b570ef9cfd15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    profileImg:
      'https://images.unsplash.com/photo-1722495102451-b570ef9cfd15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D',
  },
];

interface MoimInfoContainerProps {
  title: string;
  description: string;
  moimId: number;
  onOpen: () => void;
}

const MoimInfoContainer = ({
  title,
  description,
  moimId,
  onOpen,
}: MoimInfoContainerProps) => {
  console.log(moimId);
  return (
    <View className="mt-16 flex flex-col">
      <View className="flex flex-row items-center px-6 h-[30px]">
        {/* TODO: API 수정되면 연결 */}
        {/* <Label label='# 개발' color='main' style='ml-1'/>
            <Label label='# 교육' color='main' style='ml-1' />
            <Label label='# IT' color='main' style='ml-1' /> */}
        <View className="flex flex-row items-center ml-auto">
          <TouchableOpacity
            className="flex flex-row items-center ml-auto"
            onPress={onOpen}>
            {images.map((item, index) => (
              <View key={index} style={{marginLeft: -7 * index}}>
                <Image
                  source={{uri: item.profileImg}}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: 'white',
                    zIndex: images.length + index,
                  }}
                />
              </View>
            ))}
          </TouchableOpacity>
          <Typography fontWeight="MEDIUM" className="ml-2">
            ...
          </Typography>
        </View>
      </View>
      <Typography fontWeight="BOLD" className="text-xl text-dark-800 px-6 mt-3">
        {title}
      </Typography>
      <Typography
        fontWeight="LIGHT"
        className="text-sm text-gray-600 px-6 mt-2">
        {description}
      </Typography>
    </View>
  );
};

export default MoimInfoContainer;
