import Avatar from 'components/@common/Avatar/Avatar';
import Label from 'components/@common/Label/Label';
import { Typography } from 'components/@common/Typography/Typography';
import { ScreenContainer } from 'components/ScreenContainer';
import { MoimPostStackNavigationProp } from 'navigators/types';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';

interface BoardPostPreviewProps {
  navigation: MoimPostStackNavigationProp
}

const BoardPostPreview = ({navigation}: BoardPostPreviewProps) => {
  return (
    <ScreenContainer>
        {/* TODO: 추후에 실제 Post 아이디로 변경 */}
        {Array(8).fill(null).map((item, index) => (
          <TouchableOpacity onPress={() => navigation.navigate('MOIM_POST_DETAIL', {id: index})} activeOpacity={0.8} key={index} className='flex flex-col border-gray-200 border-[0.5px] p-4 rounded-lg'>
              <View className='flex flex-row items-center'>
                <Avatar size='XS' />
                <Typography fontWeight='MEDIUM' className='text-dark-800 text-xs ml-2'>새로운 부회장</Typography>
                <Label label='가입 인사' style='ml-auto' color='main' />
                </View>
                <View className='flex flex-col mt-3'>
                <Typography fontWeight='BOLD' className='text-dark-800 text-sm'>매주 월요일 정기 스터디</Typography>
                <Typography fontWeight='LIGHT' className='text-dark-800 text-sm mt-1'>여러분 무조건 참여해야 하는 활동 중 하나입니다. 따라서 워크북을 꾸준히
                하시길 바랍니다.</Typography>
              </View>

              <View className='flex flex-row items-end mt-3'>
                <Typography fontWeight='MEDIUM' className='text-gray-400 text-xs'>2024년 5월 17일 오후 2:00</Typography>
                <Typography fontWeight='MEDIUM' className='text-gray-400 text-xs ml-3'>댓글 0</Typography>
                <Typography fontWeight='MEDIUM' className='text-gray-400 text-xs ml-3'>좋아요 10</Typography>
              </View>
          </TouchableOpacity>
        ))}
  </ScreenContainer>
  );
};

export default BoardPostPreview;