import {useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from 'components/@common/Avatar/Avatar';
import Label from 'components/@common/Label/Label';
import {InputField} from 'components/@common/InputField/InputField';
import {Typography} from 'components/@common/Typography/Typography';

import useMoimManagment from 'hooks/queries/MoimManagement/useMoimManagement';
import {MoimManagementRouteProp} from 'navigators/types';
import {TMoimRole} from 'types/dtos/moimManage';

interface PermissionManageScreenProps {
  route: MoimManagementRouteProp;
}

const PermissionManageScreen = ({route}: PermissionManageScreenProps) => {
  const moimId = route.params.id;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {useGetInfinityMoimMembers, updateMoimAuthoritiesMutation} =
    useMoimManagment();
  const {
    data: moimMembers,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useGetInfinityMoimMembers(moimId);

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

  const handleMemberAuth = (userId: number, moimRole: TMoimRole) => {
    const newRole = moimRole === 'MEMBER' ? 'ADMIN' : 'MEMBER';
    if (moimId && userId && moimRole) {
      updateMoimAuthoritiesMutation.mutate(
        {
          moimId,
          moimRole: newRole,
          userId,
        },
        {
          onSuccess: data => {
            console.log(data);
            refetch();
          },
          onError: error => {
            console.error(error.response);
          },
        },
      );
    }
  };

  if (isPending) {
    return <Typography fontWeight="MEDIUM">로딩 중</Typography>;
  }

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러</Typography>;
  }

  const renderHeader = () => (
    <View className="flex flex-row items-center justify-between mt-5">
      <View className="w-[90%]">
        <InputField touched placeholder="멤버 검색" />
      </View>
      <TouchableOpacity>
        <Ionicons name="search" size={27} color={'#1D2002'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-4 pt-0">
      <FlatList
        ListHeaderComponent={renderHeader}
        data={moimMembers.pages.flatMap(page => page.userPreviewDTOList)}
        renderItem={({item}) => (
          <View key={item.userId} className="flex flex-row items-center py-3">
            <Avatar uri={item.imageKeyName} />
            <Typography
              fontWeight="MEDIUM"
              className="text-dark-800 text-sm ml-3 mr-3">
              {item.nickname}
            </Typography>
            {item.moimRole !== 'OWNER' && (
              <Label label={item.moimRole} color="dark" />
            )}
            <TouchableOpacity
              className="p-2 rounded-xl bg-gray-200 ml-auto"
              onPress={() => handleMemberAuth(item.userId, item.moimRole)}>
              <Typography fontWeight="MEDIUM" className="text-gray-600 text-xs">
                {item.moimRole === 'ADMIN' ? '권한 취소' : '권한 부여'}
              </Typography>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-2" />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default PermissionManageScreen;
