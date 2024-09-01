import React, {useState} from 'react';
import {Dimensions, FlatList, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BottomSheet from 'components/@common/BottomSheet/BottomSheet.tsx';
import {InputField} from 'components/@common/InputField/InputField.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import Avatar from 'components/@common/Avatar/Avatar.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';

import useGetInfinityMoimMembers from 'hooks/queries/MoimSpace/useGetInfinityMoimMembers.ts';
import useDebounce from 'hooks/useDebounce.ts';

interface IReaderPickerBottomSheet {
  moimId: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleToggleSelect: (selectedId: number) => void;
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  selectedIds: number[];
}

const {height} = Dimensions.get('window');

const ReaderPickerBottomSheet = ({
  moimId,
  isOpen,
  onOpen,
  onClose,
  handleToggleSelect,
  selectedIds,
}: IReaderPickerBottomSheet) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);
  const {
    data: members,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinityMoimMembers(moimId, debouncedSearch);
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
    <BottomSheet
      isBottomSheetOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      height={height * 0.5}>
      <View className="flex-1 w-full flex-col items-center h-full">
        <View className="w-[90%] mt-5">
          <InputField
            className="flex-1"
            touched={false}
            placeholder="멤버 검색"
            value={search}
            onChangeText={text => setSearch(text)}
            icon={<Ionicons name="search" size={28} color={'#1D2002'} />}
          />
        </View>
        <View className="w-[90%] flex-col flex-1">
          <FlatList
            data={members?.pages.flatMap(page => page.userPreviewDTOList)}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => handleToggleSelect(item.userId)}
                  className="flex-row items-center w-full gap-x-2">
                  <View className="flex flex-col items-center justify-center border-gray-400 border-[1px] p-[5] rounded-full w-[15] h-[15] mr-4">
                    <View
                      className={`${
                        selectedIds.includes(item.userId) ? 'bg-main' : ''
                      } rounded-full w-[10] h-[10]`}
                    />
                  </View>
                  <Avatar uri={item.imageKeyName} />
                  <Typography fontWeight={'BOLD'}>{item.nickname}</Typography>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{
              padding: 20,
              gap: 20,
            }}
            keyExtractor={item => String(item.userId)}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            scrollIndicatorInsets={{right: 1}}
          />
        </View>
        <View className="w-full mb-5 px-3">
          <CustomButton
            label="모임원 선택"
            textStyle="text-white font-bold text-base"
            onPress={onClose}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default ReaderPickerBottomSheet;
