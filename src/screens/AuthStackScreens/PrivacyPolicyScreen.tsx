import {ScrollView, View} from 'react-native';
import {ScreenContainer} from '../../components/ScreenContainer.tsx';
import {Typography} from '../../components/@common/Typography/Typography.tsx';

export default function PrivacyPolicyScreen() {
  return (
    <ScreenContainer>
      <Typography className="text-xl mt-10" fontWeight={'BOLD'}>
        개인 정보 처리방침에 대해
      </Typography>
      <Typography className="text-xl" fontWeight={'BOLD'}>
        동의해주세요.
      </Typography>
      <ScrollView className="mt-5">
        <Typography fontWeight={'LIGHT'}>
          해당 서비스는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고
          있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용
          목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를
          받는 등 필요한 조치를 이행할 예정입니다. 홈페이지 회원 가입 및 관리
          회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별ㆍ인증,
          회원자격 유지ㆍ관리, 제한적 본인확인제 시행에 따른 본인 확인, 서비스
          부정이용 방지, 만 14세 미만 아동의 개인정보 처리시 법정대리인의 동의
          여부 확인, 홈페이지 이용에 관한 문의사항 확인 및 결과 통보, 홈페이지
          서비스 개선을 위한 이용자 의견 수렴, 각종 고지ㆍ통지 등을 목적으로
          개인정보를 처리합니다. 당 사이트가 개인정보 보호법 제32조에 따라
          등록ㆍ공개하는 개인정보파일의 처리 목적은 다음과 같습니다.
          개인정보파일의 명칭 운영근거/처리목적 개인정보파일에 기록되는
          개인정보의 항목 보유기간 국가통계포털 회원명부* 개인정보보호법 제15조
          및 정보주체의 동의/회원가입 및 회원제 서비스 제공 필수: 이름,
          생년월일, 핸드폰(연락처), E-Mail, 성별 선택: 집연락처, 집주소 2년 *
          KOSIS(국가통계포털), SGIS+(통계지리정보서비스), MDIS(마이크로데이터
          통합서비스), 지표누리(구 e-나라지표, 구 국가주요지표),
          통계데이터센터의 통계정보사이트 회원을 통합회원으로 운영함 ※ 좀 더
          상세한 통계청의 개인정보파일 등록사항 공개는
          개인정보포털(www.privacy.go.kr)→ 개인서비스 → 정보주체 권리행사 →
          개인정보 열람등요구 → 개인정보파일 검색 → 기관명에 “통계청(또는
          소속기관명)” 입력 후 조회 메뉴를 활용해주시기 바랍니다.
        </Typography>
      </ScrollView>
    </ScreenContainer>
  );
}
