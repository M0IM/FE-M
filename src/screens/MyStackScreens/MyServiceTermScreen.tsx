import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';

// TODO: 내용 확정 후, 분리 요망

export default function MyServiceTermScreen() {
  return (
    <ScreenContainer>
      <Typography fontWeight={'BOLD'} className='text-lg text-dark-800 mt-4'>MOIM 서비스 이용약관</Typography>
      <Typography fontWeight='MEDIUM' className='text-gray-500'>
      제 1 조 (목적){'\n\n'}
      본 약관은 통계청이 운영하는 국가통계포털(KOSIS), 마이크로데이터서비스(MDIS), 지표누리(구 e-나라지표, 구 국가주요지표), 통계지리정보서비스(SGIS+plus), 통계데이터센터의 통계정보 사이트 (이하 {'"'}당 사이트{'"'})에서 제공하는 모든 서비스(이하 “서비스”)의 이용조건 및 절차, 이용자와 각 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
      {'\n\n'}
      제 2 조 (약관의 효력과 변경){'\n\n'}
      당 사이트는 이용자가 본 약관 내용에 동의하는 것을 조건으로 이용자에게 서비스를 제공하며, 당 사이트의 서비스 제공 행위 및 이용자의 서비스 사용 행위에는 본 약관을 우선적으로 적용하겠습니다.
      당 사이트는 본 약관을 사전 고지 없이 변경할 수 있으며, 변경된 약관은 당 사이트 내에 공지함으로써 이용자가 직접 확인하도록 할 것입니다. 이용자가 변경된 약관에 동의하지 아니하는 경우 본인의 회원등록을 취소(회원 탈퇴)할 수 있으며, 계속 사용할 경우에는 약관 변경에 대한 암묵적 동의로 간주됩니다. 변경된 약관은 공지와 동시에 그 효력을 발휘합니다.
      {'\n\n'}
      제 3 조 (약관외 준칙){'\n\n'}
      본 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법, 정보통신윤리위원회심의규정, 정보통신윤리강령, 저작권법 및 기타 관련 법령의 규정에 의합니다.
      </Typography>
    </ScreenContainer>
  );         
}
