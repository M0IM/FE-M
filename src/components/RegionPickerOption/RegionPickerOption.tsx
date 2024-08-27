import {useState, useEffect} from 'react';
import {
  View,
  Modal,
  FlatList,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import {SearchInput} from '../@common/SearchInput/SearchInput';
import {Typography} from '../@common/Typography/Typography';
import useDebounce from 'hooks/useDebounce';
import useGetInfinityRegion from 'hooks/queries/Region/useGetInfinityRegion';

const {height: screenHeight} = Dimensions.get('window');

interface IRegionPickerOption {
  visible: boolean;
  setRegion: (region: string) => void;
  handleConfirmRegion: () => void;
  onClose: () => void;
}

export function RegionPickerOption({
  visible,
  setRegion,
  handleConfirmRegion,
  onClose,
}: IRegionPickerOption) {
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
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

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
    return <Typography fontWeight="MEDIUM">로딩 중</Typography>;
  }

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러입니다.</Typography>;
  }

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight, screenHeight * 0.1],
  });

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <KeyboardAvoidingView style={{flex: 1, justifyContent: 'flex-end'}}>
            <Animated.View
              style={{transform: [{translateY}]}}
              className="h-[70%] rounded-t-3xl bg-white">
              <View className="p-4 border-b-black border-b-0.5">
                <SearchInput
                  className="px-2"
                  value={keyword}
                  onChangeText={text => setKeyword(text)}
                  placeholder={'찾고싶은 모임을 검색해주세요.'}
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
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
