import Avatar from 'components/@common/Avatar/Avatar';
import Label from 'components/@common/Label/Label';
import { Typography } from 'components/@common/Typography/Typography';
import { ScreenContainer } from 'components/ScreenContainer';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

const BOARD_TITLES = [
  { key: 'ALL', label: '전체' },
  { key: 'NOTIFICATION', label: '공지' },
  { key: 'REVIEW', label: '활동 후기' },
  { key: 'GREET', label: '가입 인사' },
  { key: 'FREE', label: '자유' }
] as const;

type BoardTitle = typeof BOARD_TITLES[number]['key'];

const MoimBoardScreen = () => {
  const [isSelected, setIsSelected] = useState<BoardTitle>('ALL');

  const handleSelect = (selectMenu: BoardTitle) => {
    setIsSelected(selectMenu);
  };

  return (
    <>
      <View className='flex flex-row justify-around border-b-[1px] border-gray-200 px-3 mb-3'>
        {BOARD_TITLES.map(({ key, label }) => (
          <Pressable
            key={key}
            onPress={() => handleSelect(key)}
            className={`${isSelected === key ? 'border-b-2 border-dark-800' : ''}`}
          >
            <Typography fontWeight='BOLD' className={`text-gray-200 text-base p-2 ${isSelected === key ? 'text-dark-800' : ''}`}>
              {label}
            </Typography>
          </Pressable>
        ))}
      </View>
      <ScreenContainer>
        {Array(8).fill(null).map((item, index) => (
          <View key={index} className='flex flex-col border-gray-200 border-[0.5px] p-4 rounded-lg'>
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
          </View>
        ))}
      </ScreenContainer>
    </>
  );
};

export default MoimBoardScreen;
