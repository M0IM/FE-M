import {View} from 'react-native';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {InputField} from 'components/@common/InputField/InputField.tsx';

import useForm from 'hooks/useForm.ts';
import useEmail from 'hooks/useEmail.ts';
import useThrottle from 'hooks/useThrottle';

import {validateReplyIssue} from 'utils';
import {MyStackNavigationProp} from '../../navigators/types';

export default function MyContactScreen({
  navigation,
}: {
  navigation: MyStackNavigationProp;
}) {
  const {postInquireEmailMutation} = useEmail();
  const form = useForm({
    initialValue: {
      replyEmail: '',
      content: '',
    },
    validate: validateReplyIssue,
  });

  const handleSendIssue = useThrottle(() => {
    postInquireEmailMutation.mutate(
      {
        replyEmail: form.values.replyEmail,
        content: form.values.content,
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      },
    );
  }, 3 * 1000);

  return (
    <ScreenContainer
      fixedBottomComponent={
        <CustomButton
          disabled={postInquireEmailMutation.isPending}
          textStyle="text-white font-bold text-lg"
          className={`${postInquireEmailMutation.isPending ? 'bg-gray-300' : ''}`}
          label={postInquireEmailMutation.isPending ? '전송중...' : '문의하기'}
          onPress={handleSendIssue}
        />
      }>
      <Typography fontWeight="BOLD" className="text-2xl text-dark-800 mt-4">
        문의하기
      </Typography>
      <View>
        <Typography className="my-4" fontWeight={'MEDIUM'}>
          회신 이메일
        </Typography>
        <InputField
          autoFocus
          placeholder="회신 이메일을 작성해주세요."
          touched={form.touched.replyEmail}
          error={form.errors.replyEmail}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          {...form.getTextInputProps('replyEmail')}
        />
      </View>
      <Typography fontWeight={'MEDIUM'}>문의 내용</Typography>
      <InputField
        className="h-[200px]"
        multiline
        touched={form.touched.content}
        error={form.errors.content}
        textAlignVertical="top"
        placeholder="문의 내용을 작성해주세요."
        {...form.getTextInputProps('content')}
      />
    </ScreenContainer>
  );
}
