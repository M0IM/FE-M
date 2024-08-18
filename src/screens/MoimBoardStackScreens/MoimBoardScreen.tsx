import FloatingButton from 'components/@common/FloatingButton/FloatingButton';
import { Typography } from 'components/@common/Typography/Typography';
import BoardPostPreview from 'components/screens/MoimBoardStackScreens/BoardPostPreview';
import { MoimPostStackNavigationProp, MoimPostStackRouteProp } from 'navigators/types';
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

interface MoimBoardScreenProps {
  route: MoimPostStackRouteProp;
  navigation: MoimPostStackNavigationProp
}

const MoimBoardScreen = ({route, navigation}: MoimBoardScreenProps) => {
  const [isSelected, setIsSelected] = useState<BoardTitle>('ALL');
  console.log('board route', route);

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
      <BoardPostPreview navigation={navigation} />
      <FloatingButton type='add' onPress={() => navigation.navigate('MOIM_POST_WRITE', { id: route.params.id })} />
    </>
  );
};

export default MoimBoardScreen;
