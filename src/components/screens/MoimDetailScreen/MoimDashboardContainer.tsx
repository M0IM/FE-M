import {View, Platform, FlatList} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {cva} from 'class-variance-authority';
import {cn, getAgeGroup} from 'utils';
import {Typography} from 'components/@common/Typography/Typography';

interface MoimDashboardContainerProps {
  femaleCount: number;
  maleCount: number;
  nonSelectCount: number;
  averageAge: number;
  diaryCount: number;
  moimReviewCount: number;
}

const MoimDashboardContainer = ({
  femaleCount,
  maleCount,
  nonSelectCount,
  averageAge,
  diaryCount,
  moimReviewCount,
}: MoimDashboardContainerProps) => {
  const totalMembers = femaleCount + maleCount + nonSelectCount;
  const femalePercentage = ((femaleCount / totalMembers) * 100).toFixed(1);
  const malePercentage = ((maleCount / totalMembers) * 100).toFixed(1);
  const nonSelectPercentage = ((nonSelectCount / totalMembers) * 100).toFixed(
    1,
  );

  const infoList = [
    {
      text: '평균 연령',
      data: `${getAgeGroup(Math.round(averageAge))}`,
    },
    {
      text: '이번달 일정',
      data: `${diaryCount}개`,
    },
    {
      text: '모임 후기',
      data: `${moimReviewCount}개`,
    },
  ];

  const data = [
    {
      value: maleCount,
      color: '#ADD8E6',
      text: '남',
    },
    {
      value: femaleCount,
      color: '#FFB6C1',
      text: '여',
    },
    {
      value: nonSelectCount,
      color: '#CFCFC4',
      text: '성별 X',
    },
  ];

  const platform = Platform.OS;
  return (
    <View className="flex flex-col p-6">
      <View className="flex flex-row">
        <FlatList
          horizontal
          data={infoList}
          contentContainerStyle={{
            paddingBottom: 20,
            width: '100%',
            justifyContent: 'space-around',
          }}
          renderItem={({item}) => (
            <View className={cn(MoimDashboardContainerVariant({platform}))}>
              <Typography
                fontWeight="MEDIUM"
                className="mt-2 text-xs text-gray-300"
                numberOfLines={1}>
                {item.text}
              </Typography>
              <Typography
                fontWeight="MEDIUM"
                className="mt-2 text-lg text-gray-600 ml-auto"
                numberOfLines={1}>
                {item.data}
              </Typography>
            </View>
          )}
        />
      </View>
      <View className="flex-row justify-center items-center h-[150px] p-4 bg-white shadow-md shadow-gray-200 rounded-2xl">
        <Typography
          fontWeight="MEDIUM"
          className="mb-20 text-xs text-gray-300 mr-5">
          성비
        </Typography>
        <PieChart
          data={data}
          donut
          innerRadius={30}
          radius={50}
          textColor="black"
          showValuesAsLabels
          labelsPosition="outward"
        />

        <View className="h-full flex-1 items-center justify-center gap-2 w-full">
          <View className="flex-row justify-around w-[75%]">
            <Typography fontWeight="MEDIUM" className="text-gray-300">
              여
            </Typography>
            <Typography fontWeight="MEDIUM" className="text-gray-500 ml-auto">
              {`${femalePercentage}% (${femaleCount}명)`}
            </Typography>
          </View>
          <View className="flex-row justify-around w-[75%]">
            <Typography fontWeight="MEDIUM" className="text-gray-300">
              남
            </Typography>
            <Typography fontWeight="MEDIUM" className="text-gray-500 ml-auto">
              {`${malePercentage}% (${maleCount}명)`}
            </Typography>
          </View>
          <View className="flex-row justify-around w-[75%]">
            <Typography fontWeight="MEDIUM" className="text-gray-300">
              기타
            </Typography>
            <Typography fontWeight="MEDIUM" className="text-gray-500 ml-auto">
              {`${nonSelectPercentage}% (${nonSelectCount}명)`}
            </Typography>
          </View>
          <View className="flex-row justify-around w-[75%]">
            <Typography fontWeight="MEDIUM" className="text-gray-300">
              전체
            </Typography>
            <Typography fontWeight="MEDIUM" className="text-gray-500 ml-auto">
              {totalMembers}명
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};

const MoimDashboardContainerVariant = cva(
  'flex flex-col p-4 justify-between bg-white w-[100] h-[100] rounded-3xl',
  {
    variants: {
      platform: {
        ios: 'shadow-md shadow-gray-200',
        android: 'elevation-lg shadow-gray-300',
        windows: 'shadow-md shadow-gray-200',
        macos: 'shadow-md shadow-gray-200',
        web: 'shadow-md shadow-gray-200',
      },
    },
  },
);

export default MoimDashboardContainer;
