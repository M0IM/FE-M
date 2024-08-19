import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {View} from 'react-native';
import ToggleSwitch from 'components/@common/ToggleSwitch/ToggleSwitch';
import useSwitch from 'hooks/useSwitch';
import useGetDetailMoimCalendar from '../../hooks/queries/MyScreen/useGetAlertStatus.ts';
import usePostEventAlertStatus from '../../hooks/queries/MyScreen/usePostEventAlertStatus.ts';
import usePostPushAlertStatus from '../../hooks/queries/MyScreen/usePostPushAlertStatus.ts';
import useGetAlertStatus from '../../hooks/queries/MyScreen/useGetAlertStatus.ts';
import {queryClient} from '../../containers/TanstackQueryContainer.tsx';

export default function EditAlertScreen() {
  const {data} = useGetAlertStatus();
  const {mutate: changeEventStatus} = usePostEventAlertStatus();
  const {mutate: changePushStatus} = usePostPushAlertStatus();

  const {switches, toggleSwitch} = useSwitch({
    push: data?.isPushAlarm as boolean,
    event: data?.isEventAlarm as boolean,
  });

  return (
    <ScreenContainer>
      <View className="h-2" />
      <View className="flex flex-row items-center px-4 mb-2">
        <View className="flex flex-col gap-y-2">
          <Typography fontWeight="BOLD">푸시 알림 받기</Typography>
          <Typography fontWeight="MEDIUM" className="text-xs text-gray-400">
            댓글, 모임 일정, 가입 상태 등에 관련된 새로운 소식을{'\n'}
            푸시 알림으로 알려드립니다.
          </Typography>
        </View>
        <ToggleSwitch
          isEnabled={switches.push}
          onToggle={() => {
            changePushStatus(
              {},
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({queryKey: ['alertStatus']});
                  toggleSwitch('push');
                },
              },
            );
          }}
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
          isEnabled={switches.event}
          onToggle={() => {
            changeEventStatus(
              {},
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({queryKey: ['alertStatus']});
                  toggleSwitch('event');
                },
              },
            );
          }}
          className="ml-auto"
        />
      </View>
    </ScreenContainer>
  );
}
