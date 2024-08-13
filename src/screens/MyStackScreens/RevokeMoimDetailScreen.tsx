import { CustomButton } from 'components/@common/CustomButton/CustomButton';
import { InputField } from 'components/@common/InputField/InputField';
import { Typography } from 'components/@common/Typography/Typography';
import { ScreenContainer } from 'components/ScreenContainer';
import { RevokeMoimStackRouteProp } from 'navigators/types';

interface RevokeMoimDetailScreenProps {
  route: RevokeMoimStackRouteProp;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars 
const RevokeMoimDetailScreen = ({ route }: RevokeMoimDetailScreenProps) => {
  return (
    <ScreenContainer
      fixedBottomComponent={<CustomButton label='탈퇴하기' textStyle='text-lg text-white font-bold' />}
    >
      <Typography fontWeight={'BOLD'} className='text-lg mt-4'>탈퇴 사유를 작성해주세요.</Typography>
      <InputField touched className='h-[200px]' multiline textAlignVertical='top' placeholder='탈퇴 사유를 작성해주세요.' />
    </ScreenContainer>
  );
};

export default RevokeMoimDetailScreen;