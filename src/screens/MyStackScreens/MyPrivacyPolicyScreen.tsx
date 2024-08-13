import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';

// TODO: 내용 확정 후, 분리 요망

export default function MyPrivacyPolicyScreen() {
  return (
    <ScreenContainer>
      <Typography fontWeight={'BOLD'} className='text-lg text-dark-800 mt-4'>MOIM 개인정보 처리방침</Typography>
      <Typography fontWeight='MEDIUM' className='text-gray-500'>
      당 서비스는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
      {'\n\n'}
      홈페이지 회원 가입 및 관리
      {'\n\n'}
      회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별ㆍ인증, 회원자격 유지ㆍ관리, 제한적 본인확인제 시행에 따른 본인 확인, 서비스 부정이용 방지, 만 14세 미만 아동의 개인정보 처리시 법정대리인의 동의 여부 확인, 홈페이지 이용에 관한 문의사항 확인 및 결과 통보, 홈페이지 서비스 개선을 위한 이용자 의견 수렴, 각종 고지ㆍ통지 등을 목적으로 개인정보를 처리합니다.
      당 사이트가 개인정보 보호법 제32조에 따라 등록ㆍ공개하는 개인정보파일의 처리 목적은 다음과 같습니다.
      개인정보파일의 명칭	운영근거/처리목적	개인정보파일에 기록되는 개인정보의 항목	보유기간
      국가통계포털 회원명부*	개인정보보호법 제15조 및 정보주체의 동의/회원가입 및 회원제 서비스 제공	필수: 이름, 생년월일, 핸드폰(연락처), E-Mail, 성별
      </Typography>
    </ScreenContainer>
  );                              
} 