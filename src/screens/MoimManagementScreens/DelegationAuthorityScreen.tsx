import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import Avatar from 'components/@common/Avatar/Avatar.tsx';
import Label from 'components/@common/Label/Label.tsx';
import {InputField} from 'components/@common/InputField/InputField.tsx';

import useMoimManagment from 'hooks/queries/MoimManagement/useMoimManagement.ts';
import useGetMoimSpaceInfo from 'hooks/queries/MoimSpace/useGetMoimSpaceInfo.ts';
import useDebounce from 'hooks/useDebounce.ts';
import {MoimManagementRouteProp} from 'navigators/types';

import {TMoimRole} from 'types/dtos/moimManage.ts';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';

interface IDelegationAuthorityScreenProps {
  route: MoimManagementRouteProp;
}

export default function DelegationAuthorityScreen({
  route,
}: IDelegationAuthorityScreenProps) {
  const moimId = route.params?.id as number;
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);
  const {useGetInfinityMoimMembers, updateMoimWangMutation} =
    useMoimManagment();
  const {data} = useGetMoimSpaceInfo(moimId);

  const {
    data: moimMembers,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useGetInfinityMoimMembers(moimId, debouncedSearch);

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

  const handleDelegationAuthority = ({
    moimId,
    userId,
  }: {
    moimId: number;
    userId: number;
  }) => {
    Alert.alert(
      '정말 모임장을 해당 유저에게 위임하시겠습니까?',
      '모임장을 위임하면, 해당 모임의 관리자 권한으로 변경됩니다.',
      [
        {
          text: '모임장 위임',
          style: 'destructive',
          onPress: () => {
            updateMoimWangMutation.mutate(
              {moimId, userId},
              {
                onSuccess: () => {
                  Toast.show({
                    type: 'success',
                    text1: '모임장 위임 성공',
                    visibilityTime: 2000,
                    position: 'bottom',
                  });
                  queryClient.invalidateQueries({
                    queryKey: ['moimMembers'],
                  });
                  queryClient.invalidateQueries({
                    queryKey: ['moimSpaceInfo'],
                  });
                },
                onError: error => {
                  Toast.show({
                    type: 'error',
                    text1: error.response?.data.message,
                    visibilityTime: 2000,
                    position: 'bottom',
                  });
                },
              },
            );
          },
        },
        {
          text: '취소',
          style: 'default',
        },
      ],
    );
  };

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={'#00F0A1'} />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러</Typography>;
  }

  const userList = moimMembers.pages.flatMap(page => page.userPreviewDTOList);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 pt-0">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="w-[90%]">
            <InputField
              touched
              placeholder="멤버 검색"
              value={search}
              onChangeText={text => setSearch(text)}
            />
          </View>
          <TouchableOpacity>
            <Ionicons name="search" size={27} color={'#1D2002'} />
          </TouchableOpacity>
        </View>
      </View>
      {userList.length !== 0 ? (
        <FlatList
          data={userList}
          renderItem={({item}) => {
            const translatedRole = handleNowRole(item.moimRole);
            console.log(
              item.moimRole !== 'OWNER',
              data?.myMoimRole === 'OWNER',
            );
            return (
              <View
                key={item.userId}
                className="flex flex-row items-center py-3">
                <Avatar uri={item.imageKeyName} />
                <Typography
                  fontWeight="MEDIUM"
                  className="text-dark-800 text-sm ml-3 mr-3">
                  {item.nickname}
                </Typography>
                <Label label={translatedRole} color="dark" />
                {/* 본인이 OWNER일 때만, 권한 부여가 가능합니다. 단, 본인이 OWNER가 아닌 경우에는 모임장 위임 버튼이 보이지 않아야 합니다. */}
                {item.moimRole !== 'OWNER' && data?.myMoimRole === 'OWNER' && (
                  <>
                    <TouchableOpacity
                      className="p-2 rounded-xl ml-auto bg-error"
                      onPress={() =>
                        handleDelegationAuthority({moimId, userId: item.userId})
                      }>
                      <Typography
                        fontWeight="BOLD"
                        className="text-xs text-white">
                        모임장 위임
                      </Typography>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            );
          }}
          keyExtractor={item => String(item.userId)}
          numColumns={1}
          contentContainerStyle={{paddingHorizontal: 30, gap: 10}}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          scrollIndicatorInsets={{right: 1}}
          indicatorStyle={'black'}
        />
      ) : (
        <View className="flex items-center justify-center h-[50%]">
          <Typography fontWeight={'BOLD'}>
            {debouncedSearch} 검색어의 유저가 존재하지 않습니다.
          </Typography>
        </View>
      )}
    </SafeAreaView>
  );
}
