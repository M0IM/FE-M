export const SECOND_STEP = {
  SIGN_UP: '회원가입',
  TERM_AGREEMENT: '약관 동의',
  TERM_AGREEMENT_DESCRIPTION: '필수 항목에 대한 약관 동의를 완료해주세요.',
  ALL_AGREE: '전체 동의',
  PERSONAL_INFO: '개인 정보 처리 방침',
  SERVICE_TERM: '서비스 이용약관',
} as const;

export const THIRD_STEP = {
  NAME: '이름',
  WRITE_NAME: '이름을 입력해주세요.',
  EMAIL: '이메일',
  WRITE_EMAIL: '이메일을 입력해주세요.',
} as const;

export const FOURTH_STEP = {
  PASSWORD_DESC_1: '비밀번호를',
  PASSWORD_DESC_2: '입력해주세요.',
  PASSWORD: '비밀번호',
  PASSWORD_VALIDATION: '8~16자리 영문, 숫자, 특수문자를 조합해 작성해주세요.',
  WRITE_PASSWORD: '비밀번호를 입력해주세요.',
  CHECK_PASSWORD: '비밀번호 확인',
  WRITE_SAME_PASSWORD: '동일한 비밀번호를 입력해주세요.',
};

export const FIFTH_STEP = {
  DESC_1: '성별 나이 거주지역 등',
  DESC_2: '개인 정보를 입력해주세요.',
  GENDER: '성별',
  MALE: '남자',
  FEMALE: '여자',
  AGE: '나이',
  WRITE_AGE: '나이를 입력해주세요.',
  RESIDENCE: '거주 지역',
  WRITE_RESIDENCE: '거주 지역을 입력해주세요,',
} as const;
