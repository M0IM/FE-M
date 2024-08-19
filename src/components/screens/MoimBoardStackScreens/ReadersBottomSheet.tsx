import Avatar from 'components/@common/Avatar/Avatar';
import BottomSheet from 'components/@common/BottomSheet/BottomSheet';
import { CustomButton } from 'components/@common/CustomButton/CustomButton';
import { InputField } from 'components/@common/InputField/InputField';
import { Typography } from 'components/@common/Typography/Typography';
import { ScreenContainer } from 'components/ScreenContainer';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ReadersBottomSheetProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ReadersBottomSheet = ({
  isOpen,
  onOpen,
  onClose
}: ReadersBottomSheetProps) => {
  return (
    <BottomSheet
      isBottomSheetOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      height={700}
    >
      <ScreenContainer
        fixedBottomComponent={<CustomButton label='읽을 사람 등록' textStyle='text-white font-bold text-base' />}
      >
        <View className='flex flex-row items-center justify-between mt-4'>
          <View className='w-[90%]'>
            <InputField touched placeholder='멤버 검색' />
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Ionicons name='search' size={28} color={'#1D2002'} />
          </TouchableOpacity>
        </View>
        <View className='flex flex-row items-center'>
          <TouchableOpacity className='flex flex-col items-center justify-center border-gray-400 border-[1px] p-[5] rounded-full w-[15] h-[15] mr-4'>
            <View className='bg-main rounded-full w-[10] h-[10]' />
          </TouchableOpacity>
          <Avatar />
          <Typography fontWeight='MEDIUM' className='ml-4'>차다인</Typography>
        </View>
      </ScreenContainer>
    </BottomSheet>
  );
};

export default ReadersBottomSheet;