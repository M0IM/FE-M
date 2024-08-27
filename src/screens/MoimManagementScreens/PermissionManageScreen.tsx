import {useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import Avatar from 'components/@common/Avatar/Avatar';
import {InputField} from 'components/@common/InputField/InputField';
import Label from 'components/@common/Label/Label';
import {Typography} from 'components/@common/Typography/Typography';

import useMoimManagment from 'hooks/queries/MoimManagement/useMoimManagement';
import {MoimManagementRouteProp} from 'navigators/types';
import {TMoimRole} from 'types/dtos/moimManage';
import {queryClient} from 'containers/TanstackQueryContainer';

interface PermissionManageScreenProps {
  route: MoimManagementRouteProp;
}

const PermissionManageScreen = ({route}: PermissionManageScreenProps) => {
  const moimId = route.params.id;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [search, setSearch] = useState('');
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
  } = useGetInfinityMoimMembers(moimId, search);

  const handleNowRole = (role: TMoimRole) => {
    if (role === 'ADMIN') {
      return '관리자';
    } else if (role === 'MEMBER') {
      return '멤버';
    } else if (role === 'OWNER') {
      return '모임장';
    }
    return '';
  };

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
          onError: error => {
            console.error(error.response);
            Toast.show({
              type: 'error',
              text1:
                error.response?.data.message ||
                '권한 변경 중 에러가 발생했습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: ['moimMembers', moimId],
            });
          },
        },
      );
    }
  };

  const handleSearchUser = () => {
    queryClient.invalidateQueries({
      queryKey: ['moimMembers', moimId],
    });
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
        <InputField
          touched
          placeholder="멤버 검색"
          value={search}
          onChangeText={text => setSearch(text)}
        />
      </View>
      <TouchableOpacity onPress={handleSearchUser}>
        <Ionicons name="search" size={27} color={'#1D2002'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-4 pt-0">
      <FlatList
        ListHeaderComponent={renderHeader}
        data={moimMembers.pages.flatMap(page => page.userPreviewDTOList)}
        renderItem={({item}) => {
          const translatedRole = handleNowRole(item.moimRole);
          return (
            <View key={item.userId} className="flex flex-row items-center py-3">
              <Avatar uri={item.imageKeyName} />
              <Typography
                fontWeight="MEDIUM"
                className="text-dark-800 text-sm ml-3 mr-3">
                {item.nickname}
              </Typography>
              <Label label={translatedRole} color="dark" />
              {item.moimRole !== 'OWNER' && (
                <TouchableOpacity
                  className="p-2 rounded-xl bg-gray-200 ml-auto"
                  onPress={() => handleMemberAuth(item.userId, item.moimRole)}>
                  <Typography
                    fontWeight="MEDIUM"
                    className="text-gray-600 text-xs">
                    {item.moimRole === 'ADMIN' ? '권한 취소' : '권한 부여'}
                  </Typography>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
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
