import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography';
import SchedulePreviewCard from 'components/space/SchedulePreviewCard/SchedulePreviewCard';

import usePost from 'hooks/queries/MoimBoard/usePost';
import {useGetMoimCalendar} from 'hooks/queries/MoimPlanHomeScreen/useGetMoimCalendar';
import {TMoimPlanListDTO} from 'types/dtos/calendar';
import {
  MoimPlanStackNavigationProp,
  MoimPostStackNavigationProp,
} from 'navigators/types';
import {detailDate, formatKoreanDate} from 'utils';
import {useNavigation} from '@react-navigation/native';

interface MoimContentsPreviewProps {
  moimId: number;
  navigation: MoimPostStackNavigationProp;
}

const MoimContentsPreview = ({
  moimId,
  navigation,
}: MoimContentsPreviewProps) => {
  const planNavigation = useNavigation<MoimPlanStackNavigationProp>();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const {useGetInfiniteMoimPostList} = usePost();
  const {data: announcementData, isPending: moimPostListIsLoading} =
    useGetInfiniteMoimPostList(moimId, 'ANNOUNCEMENT');
  const announcementDataList = announcementData?.pages[0].moimPreviewList;
  const {data: calenderData, isPending: calenderIsLoading} = useGetMoimCalendar(
    {moimId, year, month},
  );

  const getAllPlans = (data: any) => {
    let allPlans: TMoimPlanListDTO[] = [];

    for (const key in data) {
      if (data[key].planList.length > 0) {
        allPlans = allPlans.concat(data[key].planList);
      }
    }

    return allPlans;
  };
  const allPlanList = getAllPlans(calenderData);

  if (moimPostListIsLoading || calenderIsLoading) {
    return (
      <View className="flex flex-col p-3 px-6">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex flex-col p-3 px-6">
      <View className="flex flex-col">
        <Typography fontWeight="BOLD" className="text-xs text-gray-400">
          예정된 일정
        </Typography>
        {allPlanList.length > 0 ? (
          <FlatList
            horizontal
            data={allPlanList}
            contentContainerStyle={{marginTop: 15}}
            renderItem={({item}) => (
              <SchedulePreviewCard
                title={item.title}
                date={item.time}
                place={item.location}
                onPress={() =>
                  planNavigation.navigate('MOIM_PLAN_DETAIL', {
                    id: moimId,
                    planId: item.planId,
                  })
                }
              />
            )}
            ItemSeparatorComponent={() => <View className="w-3" />}
          />
        ) : (
          <View className="flex flex-col flex-1 items-center justify-center p-5">
            <Typography fontWeight="MEDIUM" className="text-gray-400 text-sm">
              아직 예정된 일정이 없습니다.
            </Typography>
          </View>
        )}
      </View>
      <View className="flex flex-col mt-10">
        <Typography fontWeight="BOLD" className="text-xs text-gray-400 mb-4">
          공지사항
        </Typography>
        {announcementDataList && announcementDataList?.length > 0 ? (
          <>
            {announcementDataList?.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                className="p-5 border-gray-200 border-[0.5px] rounded-xl mb-4"
                onPress={() =>
                  navigation.navigate('MOIM_POST_DETAIL', {
                    id: moimId,
                    postId: item?.moimPostId,
                  })
                }>
                <View className="flex flex-row">
                  <Typography
                    fontWeight="BOLD"
                    className="text-dark-800 text-sm">
                    {item.title}
                  </Typography>
                  <Typography
                    fontWeight="BOLD"
                    className="text-main text-sm ml-2">
                    N
                  </Typography>
                </View>
                <Typography
                  fontWeight="MEDIUM"
                  className="text-dark-800 text-sm mt-1">
                  {item.content}
                </Typography>
                <View className="flex flex-row gap-x-3">
                  <Typography
                    fontWeight="MEDIUM"
                    className="text-gray-300 text-xs mt-5">
                    {formatKoreanDate(new Date(item.createAt))}
                  </Typography>
                  <Typography
                    fontWeight="MEDIUM"
                    className="text-gray-300 text-xs mt-5">
                    {detailDate(new Date(item.createAt))}
                  </Typography>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View className="flex flex-col flex-1 items-center justify-center p-5">
            <Typography fontWeight="MEDIUM" className="text-gray-400 text-sm">
              새로운 공지가 없습니다.
            </Typography>
          </View>
        )}
      </View>
    </View>
  );
};

export default MoimContentsPreview;
