import { Typography } from 'components/@common/Typography/Typography';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CategoryDropdown = () => {
 
    // 추후에 바텀모달로 변경
    return (
        <View className='flex flex-col'>
            <Typography fontWeight={'MEDIUM'} className='text-sm text-gray-500 mb-2'>
                카테고리
            </Typography>
            <TouchableOpacity activeOpacity={0.8} className='flex flex-row border-0.5 border-gray-100 rounded-xl bg-gray-100 p-4'>
                <Typography fontWeight='MEDIUM' className='text-gray-500'>카테고리</Typography>
                <Ionicons name="chevron-down" style={{marginLeft: 'auto'}} size={15} color={'#535353'} />
            </TouchableOpacity> 
        </View>
    );
};

export default CategoryDropdown;