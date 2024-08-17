import { FlatList, Image, Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { InputField } from 'components/@common/InputField/InputField';
import { Typography } from 'components/@common/Typography/Typography';
import { ScreenContainer } from 'components/ScreenContainer';
import { CustomButton } from 'components/@common/CustomButton/CustomButton';
import useDropdown from 'hooks/useDropdown';
import CustomDropdown from 'components/@common/Dropdown/CustomDropdown';
import { POST_WRITE_LIST } from 'constants/screens/MoimBoardStackScreens/PostList';
import { useState } from 'react';
import ReadersBottomSheet from 'components/screens/MoimBoardStackScreens/ReadersBottomSheet';

const testImages = [
  "https://images.unsplash.com/photo-1722648403966-922e95b2bd7e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1722265620783-12d44a721b5a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1722861315999-5de71ce7cdda?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5MXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1722648403966-922e95b2bd7e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1722265620783-12d44a721b5a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1722861315999-5de71ce7cdda?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5MXx8fGVufDB8fHx8fA%3D%3D",
];

const MoimPostWriteScreen = () => {
  const { isPressed, category, handleCategory, handleSelectedCategory } = useDropdown();
  const [readers, setReaders] = useState('전체 대상');
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <ScreenContainer>
      <View className='mt-1' />
        <CustomDropdown 
          isPressed={isPressed}
          selectedMenu={category}
          placeholder='카테고리 선택'
          menuList={POST_WRITE_LIST}
          handleSelect={handleSelectedCategory}
          onPress={handleCategory}
          height={160}
        />
        {category === '공지사항' && <TouchableOpacity onPress={open} activeOpacity={0.8} className='flex flex-row border-0.5 border-gray-100 rounded-xl bg-gray-100 p-4'>
          <Typography fontWeight='MEDIUM' className='text-sm text-gray-400'>전체 대상</Typography>
          <Ionicons name='chevron-up-outline' color={'#535353'} size={15} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>}
        <InputField touched placeholder='제목을 입력해주세요.' />
        <TextInput
          placeholder='내용을 입력해주세요.' 
          className='p-2 min-h-[300] max-h-[800] text-dark-800' 
          multiline 
          placeholderTextColor={'#72787F'}
          textAlignVertical="top"
        />
        <View className='flex flex-col gap-y-3'>
          <Typography fontWeight='LIGHT' className='text-gray-300 text-xs'>[ 모임 게시판 이용 안내 ]</Typography>
          <Typography fontWeight='LIGHT' className='text-gray-300 text-xs'>게시판 주제에 맞지 않는 글, 커뮤니티 이용자에게 불쾌감을 줄 수 있는 내용, 차별 및 혐오표현, 유해 정보, 음란물, 불법 컨텐츠, 개인정보, 욕설, 명예쉐손 등이 포함된 게시글은 신고 대상입니다.</Typography>
          <Typography fontWeight='LIGHT' className='text-gray-300 text-xs'>해당 게시글이 5번 이상 신고 되면 더 이상 게시판에 노출되지 않거나, 관리자 판단 하에 삭제 대상이 될 수 있습니다.</Typography>
        </View>
        <View className='flex flex-row items-center'>
          <TouchableOpacity activeOpacity={0.8}>
            <Ionicons name='camera' size={30} color={'#9EA4AA'} style={{padding: 10}}/>
          </TouchableOpacity>
          <FlatList
            horizontal
            data={testImages}
            contentContainerStyle={{ marginLeft: 20 }}
            renderItem={({item}) => (
                <View className='w-[80] h-[100]'>
                  <Image source={{uri: item}} className='w-full h-full rounded-2xl' />
                  <Pressable className='flex flex-col items-center justify-center absolute bottom-0 w-[80] bg-white h-2/5 rounded-b-2xl border-[1px] border-gray-200'>
                    <Ionicons name="trash" size={15} color={'#9EA4AA'} />
                  </Pressable>
                </View>
            )}
            ItemSeparatorComponent={() => <View className='w-2' />}
          />
      </View>
      <CustomButton label='게시하기' textStyle='text-white text-base font-bold' className='mt-3' />
      <ReadersBottomSheet isOpen={isOpen} onOpen={open} onClose={close} />
    </ScreenContainer>
  );
};

export default MoimPostWriteScreen;