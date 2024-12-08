import {useState} from 'react';
import StarRating from 'react-native-star-rating-widget';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {InputField} from 'components/@common/InputField/InputField.tsx';

import {queryClient} from 'containers/TanstackQueryContainer.tsx';
import usePostReviewMutation from '../../hooks/queries/MoimPostReviewScreen/usePostReviewMutation.ts';
import {ActivityIndicator} from 'react-native';
import useThrottle from 'hooks/useThrottle.ts';
import {
  UserProfileStackNavigationProp,
  UserProfileStackRouteProp,
} from 'navigators/types/index.ts';
import Toast from 'react-native-toast-message';

export default function MoimPostReviewScreen({
  route,
  navigation,
}: {
  route: UserProfileStackRouteProp;
  navigation: UserProfileStackNavigationProp;
}) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const {mutate, isPending} = usePostReviewMutation();
  const targetUserId = route.params.id as number;

  const handlePressReview = useThrottle(() => {
    mutate(
      {targetUserId, rating, content: review},
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['review']});
          queryClient.invalidateQueries({queryKey: ['profile', targetUserId]});
          navigation.goBack();
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1:
              error.response?.data.message ||
              '후기 작성 중 에러가 발생했습니다.',
            visibilityTime: 2000,
            position: 'bottom',
          });
        },
      },
    );
  });

  return (
    <ScreenContainer
      fixedBottomComponent={
        <CustomButton
          disabled={isPending}
          label={isPending ? <ActivityIndicator /> : '후기 작성'}
          textStyle="text-lg text-white font-bold"
          onPress={handlePressReview}
          isLoading={isPending}
          inValid={isPending}
        />
      }>
      <Typography fontWeight={'BOLD'} className="text-lg mt-4">
        이 멤버의 활동 평가를 해주세요!
      </Typography>

      <StarRating
        rating={rating}
        onChange={setRating}
        starSize={30}
        color="gold"
        starStyle={{marginHorizontal: 5}}
        maxStars={5}
      />
      <InputField
        touched
        className="h-[200px] mt-4"
        multiline
        textAlignVertical="top"
        placeholder="해당 멤버가 모임에서 어떻게 활동했는지 작성해주세요!"
        value={review}
        returnKeyType="join"
        onChangeText={text => setReview(text)}
      />
    </ScreenContainer>
  );
}
