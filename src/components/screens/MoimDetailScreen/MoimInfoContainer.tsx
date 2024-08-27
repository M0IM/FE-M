// import Label from 'components/@common/Label/Label';
import {Typography} from 'components/@common/Typography/Typography';
import {Image, TouchableOpacity, View} from 'react-native';
import {TUserPreviewDTO} from 'types/dtos/moim';

interface MoimInfoContainerProps {
  title: string;
  description: string;
  onOpen: () => void;
  moimMembers: TUserPreviewDTO[];
}

const MoimInfoContainer = ({
  title,
  description,
  onOpen,
  moimMembers,
}: MoimInfoContainerProps) => {
  return (
    <View className="mt-16 flex flex-col">
      {moimMembers && moimMembers.length > 0 && (
        <View className="flex flex-row items-center px-6 h-[30px]">
          {/* TODO: API 수정되면 연결 */}
          {/* <Label label='# 개발' color='main' style='ml-1'/>
            <Label label='# 교육' color='main' style='ml-1' />
            <Label label='# IT' color='main' style='ml-1' /> */}
          <View className="flex flex-row items-center ml-auto">
            <TouchableOpacity
              className="flex flex-row items-center ml-auto"
              onPress={onOpen}>
              {moimMembers &&
                moimMembers.length > 0 &&
                moimMembers.map((item, index) => (
                  <View key={index} style={{marginLeft: -7 * index}}>
                    <Image
                      source={{uri: item.imageKeyName}}
                      style={{
                        width: 25,
                        height: 25,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: 'white',
                        zIndex: moimMembers.length + index,
                      }}
                    />
                  </View>
                ))}
            </TouchableOpacity>
            {moimMembers.length > 3 && (
              <Typography fontWeight="MEDIUM" className="ml-2">
                ...
              </Typography>
            )}
          </View>
        </View>
      )}

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
