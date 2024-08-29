import {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useDebounce from 'hooks/useDebounce.ts';
import {Typography} from '../../@common/Typography/Typography.tsx';
import {InputField} from '../../@common/InputField/InputField.tsx';
import useGetInfinityRegion from '../../../hooks/queries/Region/useGetInfinityRegion.ts';
import Octicons from 'react-native-vector-icons/Octicons';

interface IRegionViewProps {
  onClose: () => void;
  setRegion: (region: string) => void;
  handleConfirmRegion: () => void;
}

const RegionView = ({setRegion, handleConfirmRegion}: IRegionViewProps) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: regions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useGetInfinityRegion(debouncedSearch);

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

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러입니다.</Typography>;
  }

  return (
    <View className="flex flex-col">
      <View className="flex flex-col mt-6 mb-3 px-4">
        <View className="flex flex-row items-center justify-between mt-5 mb-3">
          <View className="w-[90%]">
            <InputField
              touched
              placeholder="지역 검색"
              value={search}
              onChangeText={text => setSearch(text)}
            />
          </View>
          <TouchableOpacity>
            <Ionicons name="search" size={27} color={'#1D2002'} />
          </TouchableOpacity>
        </View>
        <View className="flex-1 items-center justify-center">
          {regions?.pages && isPending ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color={'#00F0A1'} />
            </View>
          ) : (
            <FlatList
              data={regions?.pages.flatMap(page => page.regionSearchDTOList)}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setRegion(item.regionTotalName);
                    handleConfirmRegion();
                  }}>
                  <View className="flex-row w-full items-center p-5 gap-x-3 justify-center border-b-gray-400 border-b-0.5">
                    <Octicons name="location" size={20} color={'green'} />
                    <Typography
                      fontWeight="LIGHT"
                      className="text-lg"
                      numberOfLines={1}>
                      {item.regionTotalName}
                    </Typography>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => String(item.dongId)}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.5}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              scrollIndicatorInsets={{right: 1}}
              contentContainerStyle={{
                width: '100%',
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default RegionView;
