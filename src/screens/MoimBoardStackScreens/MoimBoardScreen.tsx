import {useCallback, useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import FloatingButton from 'components/@common/FloatingButton/FloatingButton';
import {Typography} from 'components/@common/Typography/Typography';
import BoardPostPreview from 'components/screens/MoimBoardStackScreens/BoardPostPreview';

import {BOARD_TITLES} from 'constants/screens/MoimBoardStackScreens/PostList';
import usePost from 'hooks/queries/MoimBoard/usePost';
import {
  MoimPostStackNavigationProp,
  MoimPostStackRouteProp,
} from 'navigators/types';
import MoimBoardSkeleton from 'components/screens/MoimHomeScreens/Skeleton/MoimBoardSkeleton';

type BoardTitleType = (typeof BOARD_TITLES)[number]['key'];

interface MoimBoardScreenProps {
  route: MoimPostStackRouteProp;
  navigation: MoimPostStackNavigationProp;
}

const MoimBoardScreen = ({route, navigation}: MoimBoardScreenProps) => {
  const [isSelected, setIsSelected] = useState<BoardTitleType>('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {useGetInfiniteMoimPostList} = usePost();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
  } = useGetInfiniteMoimPostList(route?.params?.id as number, isSelected);

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

  useFocusEffect(
    useCallback(() => {
      setIsSelected('ALL');
    }, []),
  );

  if (isPending) {
    return (
      <SafeAreaView>
        <MoimBoardSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <>
      <View className="flex flex-row justify-around border-b-[1px] border-gray-200 px-3 mb-3">
        {BOARD_TITLES.map(({key, label}) => (
          <Pressable
            key={key}
            onPress={() => handleSelect(key)}
            className={`${isSelected === key ? 'border-b-2 border-dark-800' : ''}`}>
            <Typography
              fontWeight="BOLD"
              className={`text-gray-200 text-base p-2 ${isSelected === key ? 'text-dark-800' : ''}`}>
              {label}
            </Typography>
          </Pressable>
        ))}
      </View>
      {data?.pages[0] && data?.pages[0]?.moimPreviewList?.length > 0 ? (
        <FlatList
          data={data?.pages.flatMap(data => data.moimPreviewList)}
          renderItem={({item}) => (
            <BoardPostPreview
              moimId={route?.params.id}
              postPreview={item}
              navigation={navigation}
            />
          )}
          ItemSeparatorComponent={() => <View className="h-3" />}
          keyExtractor={item => String(item?.moimPostId)}
          numColumns={1}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          contentContainerStyle={{
            paddingHorizontal: 20,
            gap: 10,
          }}
        />
      ) : (
        <View className="flex flex-col justify-center items-center h-[60%]">
          <Typography fontWeight="LIGHT" className="text-gray-600 text-base">
            아직 작성된 게시글이 없습니다.
          </Typography>
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-gray-200 rounded-2xl p-3 px-5 mt-4"
            onPress={() => {
              if (isSelected === 'ALL') {
                navigation.navigate('MOIM_POST_WRITE', {id: route.params.id});
              } else {
                navigation.navigate('MOIM_POST_WRITE', {
                  id: route.params.id,
                  postType: isSelected,
                });
              }
            }}>
            <Typography fontWeight="BOLD" className="text-gray-500 text-sm">
              새로운 게시글 작성하기
            </Typography>
          </TouchableOpacity>
        </View>
      )}

      <FloatingButton
        type="add"
        onPress={() =>
          navigation.navigate('MOIM_POST_WRITE', {id: route.params.id})
        }
      />
    </>
  );
};

export default MoimBoardScreen;
