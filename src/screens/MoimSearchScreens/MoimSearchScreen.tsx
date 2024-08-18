import {useState} from 'react';
import {FlatList, Keyboard, View} from 'react-native';

import {ActiveMoimCard} from 'components/calendar/ActiveMoimCard';
import {useGetSearchInfiniteMoimList} from '../../hooks/queries/MoimSearchScreen/useGetSeachInfiniteMoimList.ts';
import {SearchInput} from '../../components/@common/SearchInput/SearchInput.tsx';
import useDebounce from '../../hooks/useDebounce.ts';
import {HomeStackNavigationProp} from '../../navigators/types';

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

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch} =
    useGetSearchInfiniteMoimList(debouncedValue);
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

// <FlatList
//     data={() => {}}
//     renderItem={() => {}}
//     ListHeaderComponent={<View></View>}
// />
// <View className="flex flex-row items-center gap-x-2 mt-5">
//   <View className="flex-1">
//     <InputField
//         className="flex-1"
//         icon={
//           <TouchableOpacity onPress={handleSearch} disabled={!value}>
//             <Ionicons
//                 name="search"
//                 size={30}
//                 color={value ? '#1D2002' : '#E9ECEF'}
//             />
//           </TouchableOpacity>
//         }
//         touched
//         placeholder="검색어 입력"
//         value={value}
//         onChangeText={value => setValue(value)}
//     />
//   </View>
// </View>
// <View className="flex flex-col gap-y-10">
//   <FlatList
//       horizontal
//       data={categoryKeys}
//       renderItem={({item}) => (
//           <TouchableOpacity onPress={() => handleSelect(item)}>
//             <Label
//                 label={item}
//                 color={CATEGORY_LIST[item] === select ? 'main' : 'gray'}
//                 variant={CATEGORY_LIST[item] === select ? 'filled' : 'outlined'}
//             />
//           </TouchableOpacity>
//       )}
//       ItemSeparatorComponent={() => <View style={{width: 8}} />}
//       keyExtractor={item => item}
//   />
//   <View className="flex flex-col">
//     <View className="flex flex-row items-center gap-x-2">
//       <Typography fontWeight="BOLD" className="text-dark-800 text-base">
//         {debouncedValue} 검색 결과
//       </Typography>
//       <Typography fontWeight="MEDIUM" className="text-gray-400 text-xs">
//         (3)
//       </Typography>
//     </View>
//   </View>
// </View>
// <View>
//   {ActiveMoimData.map(
//       ({id, title, subTitle, category, region, memberCount}) => {
//         return (
//             <ActiveMoimCard
//                 key={id}
//                 id={String(id)}
//                 title={title}
//                 subTitle={subTitle}
//                 category={category}
//                 region={region}
//                 memberCount={memberCount}
//             />
//         );
//       },
//   )}
// </View>
