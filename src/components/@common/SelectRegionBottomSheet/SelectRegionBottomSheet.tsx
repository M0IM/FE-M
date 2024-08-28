import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useEffect, useState} from 'react';
import {TouchableWithoutFeedback, Animated} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import useDebounce from 'hooks/useDebounce';
import useGetInfinityRegion from 'hooks/queries/Region/useGetInfinityRegion';
import {Typography} from '../Typography/Typography';
import {SearchInput} from '../SearchInput/SearchInput';
import BottomSheet from '../BottomSheet/BottomSheet';

const {height: screenHeight} = Dimensions.get('window');

interface SelectRegionBottomSheetProps {
  isBottomSheetOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setRegion: (region: string) => void;
  handleConfirmRegion: () => void;
  placeholder?: string;
}

const SelectRegionBottomSheet = ({
  isBottomSheetOpen,
  onOpen,
  onClose,
  setRegion,
  handleConfirmRegion,
  placeholder = '지역을 검색해주세요.',
}: SelectRegionBottomSheetProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const debouncedValue = useDebounce(keyword, 1000);
  const [animation] = useState(new Animated.Value(0));
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: regions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useGetInfinityRegion(debouncedValue);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isBottomSheetOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isBottomSheetOpen]);

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

  if (isPending) {
    return (
      <View className="flex-col items-center justify-center h-[300]">
        <ActivityIndicator size="large" color={'#00F0A1'} />
      </View>
    );
  }

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러입니다.</Typography>;
  }

  return (
    <BottomSheet
      isBottomSheetOpen={isBottomSheetOpen}
      onOpen={onOpen}
      onClose={onClose}
      height={screenHeight * 0.5}>
      <View className="flex-1 w-full h-full">
        <TouchableWithoutFeedback onPress={onClose}>
          <KeyboardAvoidingView>
            <Animated.View className="h-full rounded-t-3xl bg-white p-2">
              <View className="p-2 border-b-black border-b-0.5">
                <SearchInput
                  className="px-2"
                  value={keyword}
                  onChangeText={text => setKeyword(text)}
                  placeholder={placeholder}
                />
              </View>
              <FlatList
                data={regions?.pages.flatMap(page => page.regionSearchDTOList)}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setRegion(item.regionTotalName);
                      handleConfirmRegion();
                    }}>
                    <View className="flex-row items-center p-5 gap-x-3 justify-start border-b-gray-400 border-b-0.5">
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
              />
            </Animated.View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </BottomSheet>
  );
};

export default SelectRegionBottomSheet;
