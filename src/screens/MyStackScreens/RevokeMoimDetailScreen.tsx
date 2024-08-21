import {useState} from 'react';
import {Alert} from 'react-native';

import {CustomButton} from 'components/@common/CustomButton/CustomButton';
import {InputField} from 'components/@common/InputField/InputField';
import {Typography} from 'components/@common/Typography/Typography';
import {ScreenContainer} from 'components/ScreenContainer';

import {
  RevokeMoimStackNavigatorProp,
  RevokeMoimStackRouteProp,
} from 'navigators/types';
import useDebounce from 'hooks/useDebounce.ts';
import useWithdrawMoim from 'hooks/queries/MyScreen/useWithdrawMoim.ts';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';

interface RevokeMoimDetailScreenProps {
  route: RevokeMoimStackRouteProp;
  navigation: RevokeMoimStackNavigatorProp;
}

const RevokeMoimDetailScreen = ({
  route,
  navigation,
}: RevokeMoimDetailScreenProps) => {
  const moimId = route.params?.id as number;
  const [exitReason, setExitReason] = useState('');
  const debouncedValue = useDebounce(exitReason, 1000);
  const {mutate} = useWithdrawMoim();

  return (
    <ScreenContainer
      fixedBottomComponent={
        <CustomButton
          label="탈퇴하기"
          textStyle="text-lg text-white font-bold"
          onPress={() => {
            Alert.alert(
              '정말 해당 모임을 탈퇴하시겠습니까?',
              '가입된 모임의 모임장인 경우, 권한 위임을 하셔야 탈퇴하실 수 있습니다.',
              [
                {
                  text: '탈퇴',
                  style: 'destructive',
                  onPress: () => {
                    mutate(
                      {moimId, exitReason: debouncedValue},
                      {
                        onSuccess: data => {
                          console.log(data);
                          queryClient.invalidateQueries({queryKey: ['myMoim']});
                          navigation.navigate('REVOKE_MOIM_LIST');
                        },
                        onError: error => {
                          console.log(error);
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
          }}
        />
      }>
      <Typography fontWeight={'BOLD'} className="text-lg mt-4">
        탈퇴 사유를 작성해주세요.
      </Typography>
      <InputField
        touched
        className="h-[200px]"
        multiline
        textAlignVertical="top"
        placeholder="탈퇴 사유를 작성해주세요."
        value={exitReason}
        onChangeText={text => setExitReason(text)}
      />
    </ScreenContainer>
  );
};

export default RevokeMoimDetailScreen;
