import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {ActiveMoimCard} from 'components/calendar/ActiveMoimCard.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {Logo} from 'components/@common/Logo/Logo.tsx';

import {HomeStackNavigationProp} from 'navigators/types';
import {useGetInfiniteMyActiveMoim} from 'hooks/queries/MoimHomeScreen/useGetInfiniteMyActiveMoim.ts';
import {MOIM_ROLE} from 'types/enums';
import Label from 'components/@common/Label/Label';
import {MOIM_ROLE_LIST} from 'constants/screens/FeedStackScreens/MoimRoleList';
import {queryClient} from 'containers/TanstackQueryContainer';

interface IMoimHomeScreenProps {
  navigation: HomeStackNavigationProp;
}

export default function MoimHomeScreen({navigation}: IMoimHomeScreenProps) {
  const [selectedRole, setSelectedRole] = useState<MOIM_ROLE>(MOIM_ROLE.ALL);
  const {
    data: moims,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useGetInfiniteMyActiveMoim(selectedRole);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const roleKeys = Object.keys(MOIM_ROLE_LIST);

  const handleSelect = (selectItem: string) => {
    const selected = MOIM_ROLE_LIST[selectItem];
    setSelectedRole(selected);
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

  if (isError) {
    return <></>;
  }

  if (isPending) {
    return (
      <SafeAreaView className="flex-1">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const moimPreviewList = moims.pages.flatMap(page => page.moimPreviewList);

  const RenderedContainer = () => {
    if (selectedRole === MOIM_ROLE.ALL) {
      return (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }>
          <View className="flex flex-col gap-5 items-center justify-center p-16">
            <Logo background={'TRANSPARENT'} size={'LG'} />
            <Typography className="text-lg" fontWeight={'BOLD'}>
              내가 활동 중인 모임이 없습니다.
            </Typography>
            <Typography fontWeight="BOLD" className="text-gray-500">
              새로운 모임에 가입해 보세요!
            </Typography>
            <CustomButton
              label={'모임에 참여하기'}
              textStyle={'text-white font-bold text-lg'}
              onPress={() => navigation.navigate('MOIM_SEARCH')}
            />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView
          className="flex-1 px-[30px]"
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }>
          <>
            <View className="flex-row gap-x-3 mt-5 mb-3 items-center">
              <Typography className="text-xl" fontWeight={'BOLD'}>
                내가 활동 중인 모임
              </Typography>
            </View>
            <View className="flex flex-col">
              <FlatList
                horizontal
                data={roleKeys}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => handleSelect(item)}>
                    <Label
                      label={item}
                      color={
                        selectedRole === MOIM_ROLE_LIST[item] ? 'main' : 'gray'
                      }
                      variant={
                        selectedRole === MOIM_ROLE_LIST[item]
                          ? 'filled'
                          : 'outlined'
                      }
                    />
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{width: 5}} />}
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </>
          <View className="flex-col p-20 gap-5 mt-5 items-center justify-center">
            <Typography fontWeight="MEDIUM" className="text-gray-400 text-sm">
              해당되는 모임이 없습니다.
            </Typography>
          </View>
        </ScrollView>
      );
    }
  };

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['myMoim'],
    });
  }, [selectedRole]);

  return (
    <SafeAreaView className="flex-1">
      {moimPreviewList && moimPreviewList.length > 0 ? (
        <FlatList
          data={moimPreviewList}
          renderItem={({item}) => {
            return (
              <ActiveMoimCard
                onPress={() =>
                  navigation.navigate('MOIM_STACK', {
                    screen: 'MOIM_SPACE',
                    params: {
                      id: item.moimId,
                    },
                  })
                }
                moim={item}
              />
            );
          }}
          keyExtractor={item => String(item.moimId)}
          numColumns={1}
          contentContainerStyle={{paddingHorizontal: 30, gap: 10}}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          scrollIndicatorInsets={{right: 1}}
          indicatorStyle={'black'}
          ListHeaderComponent={
            <>
              <View className="flex-row gap-x-3 mt-5 mb-3 items-center">
                <Typography className="text-xl" fontWeight={'BOLD'}>
                  내가 활동 중인 모임
                </Typography>
              </View>
              <View className="flex flex-col">
                <FlatList
                  horizontal
                  data={roleKeys}
                  renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleSelect(item)}>
                      <Label
                        label={item}
                        color={
                          selectedRole === MOIM_ROLE_LIST[item]
                            ? 'main'
                            : 'gray'
                        }
                        variant={
                          selectedRole === MOIM_ROLE_LIST[item]
                            ? 'filled'
                            : 'outlined'
                        }
                      />
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => <View style={{width: 5}} />}
                  keyExtractor={item => item}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </>
          }
        />
      ) : (
        <RenderedContainer />
      )}
    </SafeAreaView>
  );
}
