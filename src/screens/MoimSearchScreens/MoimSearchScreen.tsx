import {useState} from 'react';
import {FlatList, Keyboard, TouchableOpacity, View} from 'react-native';

import {ActiveMoimCard} from 'components/calendar/ActiveMoimCard';
import {SearchInput} from 'components/@common/SearchInput/SearchInput.tsx';
import Label from 'components/@common/Label/Label.tsx';

import {MOIM_REQUEST_TYPE} from 'types/enums';
import useDebounce from 'hooks/useDebounce.ts';
import {useGetSearchInfiniteMoimList} from 'hooks/queries/MoimSearchScreen/useGetSeachInfiniteMoimList.ts';
import {HomeStackNavigationProp} from 'navigators/types';
import {CATEGORY_LIST} from 'constants/screens/MoimSearchScreen/CategoryList.ts';

const MoimSearchScreen = ({
  navigation,
}: {
  navigation: HomeStackNavigationProp;
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const debouncedValue = useDebounce(keyword, 1000);
  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };
  const [selectedCategory, setSelectedCategory] =
    useState<MOIM_REQUEST_TYPE | null>(null);
  const categoryKeys = Object.keys(CATEGORY_LIST);

  const handleSelect = (selectItem: string) => {
    if (selectedCategory !== null) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(CATEGORY_LIST[selectItem] || null);
    }
  };

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch} =
    useGetSearchInfiniteMoimList(debouncedValue, selectedCategory);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  return (
    <View className="flex-1 bg-white p-4">
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        onSubmit={() => Keyboard.dismiss()}
        placeholder={'찾고싶은 모임을 검색해주세요.'}
      />
      <View className="flex my-3 flex-col">
        <FlatList
          horizontal
          data={categoryKeys}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Label
                label={item}
                color={
                  CATEGORY_LIST[item] === selectedCategory ? 'main' : 'gray'
                }
                variant={
                  CATEGORY_LIST[item] === selectedCategory
                    ? 'filled'
                    : 'outlined'
                }
              />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={data.pages.flatMap(page => page.moimPreviewList)}
        renderItem={({item}) => {
          return (
            <ActiveMoimCard
              key={item.moimId}
              moim={item}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={item => String(item.moimId)}
        numColumns={1}
        contentContainerStyle={{
          paddingHorizontal: 30,
          gap: 10,
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        scrollIndicatorInsets={{right: 1}}
        indicatorStyle={'black'}
      />
    </View>
  );
};

export default MoimSearchScreen;
