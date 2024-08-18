import { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import FloatingButton from 'components/@common/FloatingButton/FloatingButton';
import { Typography } from 'components/@common/Typography/Typography';
import BoardPostPreview from 'components/screens/MoimBoardStackScreens/BoardPostPreview';
import { BOARD_TITLES } from 'constants/screens/MoimBoardStackScreens/PostList';
import usePost from 'hooks/queries/MoimBoard/usePost';
import { MoimPostStackNavigationProp, MoimPostStackRouteProp } from 'navigators/types';

type BoardTitleType = typeof BOARD_TITLES[number]['key'];

interface MoimBoardScreenProps {
  route: MoimPostStackRouteProp;
  navigation: MoimPostStackNavigationProp
}

const MoimBoardScreen = ({route, navigation}: MoimBoardScreenProps) => {
  const [isSelected, setIsSelected] = useState<BoardTitleType>('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { useGetInfiniteMoimPostList } = usePost();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useGetInfiniteMoimPostList(route?.params?.id as number, isSelected);
  console.log('board route', route);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleSelect = (selectMenu: BoardTitleType) => {
    setIsSelected(selectMenu);
  };

  useEffect(() => {
    refetch();
  }, [isSelected]);

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
      <FlatList 
        data={data?.pages.flat()}
        renderItem={({item}) => (
          <FlatList 
            data={item.moimPreviewList}
            renderItem={({item}) => (
              <BoardPostPreview postPreview={item} navigation={navigation} />
            )}
            ItemSeparatorComponent={() => <View className='h-3' />}
            keyExtractor={item => String(item?.moimPostId)}
            numColumns={1}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      />
      <FloatingButton type='add' onPress={() => navigation.navigate('MOIM_POST_WRITE', { id: route.params.id })} />
    </>
  );
};

export default MoimBoardScreen;
