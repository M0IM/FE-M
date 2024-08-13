import { InputField } from 'components/@common/InputField/InputField';
import { Typography } from 'components/@common/Typography/Typography';
import { View, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface MoimTagContainerProps {
    tags: string[];
    addTagField: () => void;
    removeTagField: (index: number) => void;
    handleTagChange: (text: string, index: number) => void;
}

const MoimTagContainer = ({
    tags,
    addTagField,
    removeTagField,
    handleTagChange
}: MoimTagContainerProps) => {
    return (
        <View className='flex flex-col'>
            <Typography fontWeight={'MEDIUM'} className='text-sm text-gray-500 mb-2'>
                모임 태그
            </Typography>
            <Typography fontWeight={'MEDIUM'} className='text-xs text-gray-300 mb-2'>
                *태그로 나만의 모임을 표현해보세요. 최대 3개까지 등록할 수 있습니다.
            </Typography>
            <View className='flex flex-row'>
                <FlatList 
                    horizontal
                    data={tags}
                    renderItem={({index}) => (
                        <View key={index} className='flex flex-row items-center mr-2'>
                            <InputField
                                touched
                                placeholder='태그 입력'
                                multiline
                                onChangeText={(text) => handleTagChange(text, index)}
                                icon={
                                    <TouchableOpacity onPress={() => removeTagField(index)}>
                                        <Ionicons name="close-sharp" size={20} color={'#9EA4AA'} />
                                    </TouchableOpacity>
                                }
                            />
                        </View>
                    )}
                />
                <TouchableOpacity onPress={addTagField} activeOpacity={0.8} className='flex flex-col items-center justify-center bg-gray-100 p-3 rounded-full ml-2'>
                    <Ionicons name='add' size={25} color={"#9EA4AA"} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MoimTagContainer;