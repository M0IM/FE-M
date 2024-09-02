import {useState} from 'react';
import {Dimensions, FlatList, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Avatar from 'components/@common/Avatar/Avatar';
import BottomSheet from 'components/@common/BottomSheet/BottomSheet';
import {CustomButton} from 'components/@common/CustomButton/CustomButton';
import {InputField} from 'components/@common/InputField/InputField';
import {Typography} from 'components/@common/Typography/Typography';

import {queryClient} from 'containers/TanstackQueryContainer';
import useGetInfinityMoimMembers from 'hooks/queries/MoimSpace/useGetInfinityMoimMembers';

const {height: screenHeight} = Dimensions.get('window');

interface ReadersBottomSheetProps {
  moimId?: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleToggleSelect: (selectedId: number) => void;
  selectedIds: number[];
}

const ReadersBottomSheet = ({
  moimId,
  isOpen,
  onOpen,
  onClose,
  handleToggleSelect,
  selectedIds,
}: ReadersBottomSheetProps) => {
  const [search, setSearch] = useState('');
  const {data: members} = useGetInfinityMoimMembers(moimId, search);
  const handleSearch = () => {
    queryClient.invalidateQueries({
      queryKey: ['moimMembers', moimId],
    });
  };

  const handleSelectAll = () => {
    const allIds = members?.pages.flatMap(page =>
      page.userPreviewDTOList.map(user => user.userId),
    );
    if (allIds) {
      if (selectedIds.length === allIds.length) {
        allIds.forEach(id => handleToggleSelect(id));
      } else {
        allIds.forEach(id => {
          if (!selectedIds.includes(id)) {
            handleToggleSelect(id);
          }
        });
      }
    }
  };

  return (
    <BottomSheet
      isBottomSheetOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      height={screenHeight * 0.7}>
      <View className="flex-1 w-full h-full">
        <View className="flex flex-col px-4 mt-1">
          <View className="flex flex-row items-center justify-between mt-4 mb-2">
            <View className="w-[90%]">
              <InputField
                touched={false}
                placeholder="멤버 검색"
                value={search}
                onChangeText={text => setSearch(text)}
              />
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={handleSearch}>
              <Ionicons name="search" size={28} color={'#1D2002'} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={handleSelectAll}>
            <Typography
              fontWeight="BOLD"
              className="text-main underline ml-auto">
              전체 선택
            </Typography>
          </TouchableOpacity>
        </View>
        <FlatList
          data={members?.pages.flatMap(page => page.userPreviewDTOList)}
          renderItem={({item}) => (
            <View className="flex flex-row items-center">
              <TouchableOpacity
                onPress={() => handleToggleSelect(item.userId)}
                className="flex flex-col items-center justify-center border-gray-400 border-[1px] p-[5] rounded-full w-[15] h-[15] mr-4">
                <View
                  className={`${
                    selectedIds.includes(item.userId) ? 'bg-main' : ''
                  } rounded-full w-[10] h-[10]`}
                />
              </TouchableOpacity>
              <Avatar uri={item.imageKeyName} />
              <Typography fontWeight="MEDIUM" className="ml-4">
                {item.nickname}
              </Typography>
            </View>
          )}
          contentContainerStyle={{
            padding: 20,
            gap: 20,
          }}
        />
        <View className="w-full mb-5 px-3">
          <CustomButton
            label="읽을 사람 등록"
            textStyle="text-white font-bold text-base"
            onPress={onClose}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default ReadersBottomSheet;
