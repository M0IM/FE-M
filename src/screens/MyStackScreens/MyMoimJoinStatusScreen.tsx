import {FlatList, Image, Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import Label from 'components/@common/Label/Label';
import {HomeStackNavigationProp} from 'navigators/types';
import {useGetInfiniteMoimJoinRequest} from 'hooks/queries/MyScreen/useGetInfiniteMoimJoinRequest';
import {JOIN_STATUS_LIST} from 'constants/screens/MyScreens/MoimJoinStatus';

interface MyMoimJoinStatusScreenProps {
  navigation: HomeStackNavigationProp;
}

export default function MyMoimJoinStatusScreen({
  navigation,
}: MyMoimJoinStatusScreenProps) {
  const {data} = useGetInfiniteMoimJoinRequest();
  console.log(data);

  return (
    <FlatList
      data={data.pages.flatMap(page => page.moimJoinRequestDTOList)}
      renderItem={({item}) => (
        <>
          {item.joinStatus === 'DELETED' ? null : (
            <Pressable
              key={item.moimId}
              className="flex flex-row p-[6] h-[102] items-center active:bg-hover active:rounded-lg"
              onPress={() =>
                navigation.navigate('MOIM_STACK', {
                  screen: 'MOIM_SPACE',
                  params: {id: item.moimId},
                })
              }>
              {/* {item.spaceImg ? (
            <Image
              source={{uri: item.spaceImg}}
              width={55}
              height={55}
              className="rounded-lg"
            />
          ) : (
            <View className="flex flex-col items-center justify-center bg-gray-100 w-[55] h-[55] rounded-lg">
              <Ionicons name="home" size={20} color="#E9ECEF" />
            </View>
          )} */}
              {/* TODO: 백엔드 이미지 반환값 확인 */}
              <View className="flex flex-col items-center justify-center bg-gray-100 w-[55] h-[55] rounded-lg">
                <Ionicons name="home" size={20} color="#E9ECEF" />
              </View>

              <View className="flex flex-col w-[70%] ml-3 gap-y-0.5">
                <Typography
                  fontWeight="BOLD"
                  className="text-dark-800 text-base w-[90%]"
                  numberOfLines={1}>
                  {item.title}
                </Typography>
                <Typography
                  fontWeight="BOLD"
                  className="text-gray-400 text-xs w-[90%]"
                  numberOfLines={1}>
                  {item.description}
                </Typography>
                <View className="flex flex-row gap-2">
                  <Typography
                    fontWeight="LIGHT"
                    className="text-gray-500 text-xs">
                    {item.moimCategory}
                  </Typography>
                  <Typography
                    fontWeight="LIGHT"
                    className="text-gray-500 text-xs"
                    numberOfLines={1}>
                    {item.location}
                  </Typography>
                  <Typography
                    fontWeight="LIGHT"
                    className="text-gray-500 text-xs">
                    참여 인원 {item.userCounts}명
                  </Typography>
                </View>
              </View>
              <Label
                label={JOIN_STATUS_LIST[item.joinStatus]}
                style="ml-auto"
              />
            </Pressable>
          )}
        </>
      )}
      contentContainerStyle={{
        padding: 10,
      }}
    />
  );
}
