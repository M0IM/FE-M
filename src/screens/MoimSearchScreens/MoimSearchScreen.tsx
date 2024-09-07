import {useState} from 'react';
import {FlatList, Keyboard, TouchableOpacity, View} from 'react-native';

import {ActiveMoimCard} from 'components/calendar/ActiveMoimCard';
import {SearchInput} from 'components/@common/SearchInput/SearchInput.tsx';
import Label from 'components/@common/Label/Label.tsx';

import useDebounce from 'hooks/useDebounce.ts';
import {useGetSearchInfiniteMoimList} from 'hooks/queries/MoimSearchScreen/useGetSeachInfiniteMoimList.ts';
import {HomeStackNavigationProp} from 'navigators/types';
import {MOIM_REQUEST_TYPE} from 'types/enums';
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
  const [selectedCategory, setSelectedCategory] = useState<MOIM_REQUEST_TYPE[]>(
    [],
  );
  const allSelectedCategory = Object.values(MOIM_REQUEST_TYPE).filter(
    type => type !== MOIM_REQUEST_TYPE.ALL,
  );
  const categoryKeys = Object.keys(CATEGORY_LIST);

  const handleSelect = (selectItem: string) => {
    setSelectedCategory(prev => {
      const selectedType = CATEGORY_LIST[selectItem];
      if (prev.includes(selectedType)) {
        return prev.filter(type => type !== selectedType);
      } else {
        return [...prev, selectedType];
      }
    });
  };

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch} =
    useGetSearchInfiniteMoimList(
      debouncedValue,
      selectedCategory.length < 1 ? allSelectedCategory : selectedCategory,
    );
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
                  selectedCategory.includes(CATEGORY_LIST[item])
                    ? 'main'
                    : 'gray'
                }
                variant={
                  selectedCategory.includes(CATEGORY_LIST[item])
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
              onPress={() =>
                navigation.navigate('MOIM_STACK', {
                  screen: 'MOIM_SPACE',
                  params: {
                    id: item.moimId,
                  },
                })
              }
            />
          );
        }}
        keyExtractor={item => String(item.moimId)}
        numColumns={1}
        contentContainerStyle={{
          paddingHorizontal: 30,
          gap: 10,
          alignItems: 'center',
          justifyContent: 'center',
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
