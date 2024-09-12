import {ActivityIndicator, View} from 'react-native';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import ToggleSwitch from 'components/@common/ToggleSwitch/ToggleSwitch';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';

import usePostEventAlertStatus from 'hooks/queries/MyScreen/usePostEventAlertStatus.ts';
import usePostPushAlertStatus from 'hooks/queries/MyScreen/usePostPushAlertStatus.ts';
import useGetAlertStatus from 'hooks/queries/MyScreen/useGetAlertStatus.ts';
import useThrottle from 'hooks/useThrottle';

export default function EditAlertScreen() {
  const {data, isPending, isError} = useGetAlertStatus();
  const {mutate: changeEventStatus} = usePostEventAlertStatus();
  const {mutate: changePushStatus} = usePostPushAlertStatus();

  if (isPending) {
    return (
      <View className="flex-col items-center justify-center h-[300]">
        <ActivityIndicator size="large" color={'#00F0A1'} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-col items-center justify-center h-[300]">
        <Typography fontWeight={'BOLD'}>에러가 발생했습니다.</Typography>
      </View>
    );
  }

  const toggleGetPushAlert = useThrottle(() => {
    changePushStatus(null, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['alertStatus']});
      },
    });
  });

  const toggleGetEventAlert = useThrottle(() => {
    changeEventStatus(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['alertStatus']});
        },
      },
    );
  });

  return (
    <ScreenContainer>
      <View className="h-2" />
      <View className="flex flex-row items-center px-4 mb-2">
        <View className="flex flex-col gap-y-2">
          <Typography fontWeight="BOLD">푸시 알림 받기</Typography>
          <Typography fontWeight="MEDIUM" className="text-xs text-gray-400">
            댓글, 모임 일정, 가입 상태 등에 관련된 {'\n'}새로운 소식을 푸시
            알림으로 알려드립니다.
          </Typography>
        </View>
        <ToggleSwitch
          isEnabled={data?.isPushAlarm}
          onToggle={toggleGetPushAlert}
          className="ml-auto"
        />
      </View>
      <View className="border-b-[1px] border-gray-200 w-[95%] self-center" />
      <View className="flex flex-row items-center px-4 mt-2">
        <View className="flex flex-col gap-y-2">
          <Typography fontWeight="BOLD">이벤트 알림 받기</Typography>
          <Typography fontWeight="MEDIUM" className="text-xs text-gray-400">
            MOIM의 새로운 기능 업데이트 및 서비스 이벤트에{'\n'}
            관련된 새로운 소식을 푸시 알림으로 알려드립니다.
          </Typography>
        </View>
        <ToggleSwitch
          isEnabled={data?.isEventAlarm}
          onToggle={toggleGetEventAlert}
          className="ml-auto"
        />
      </View>
    </ScreenContainer>
  );
}
