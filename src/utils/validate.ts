import {TSignup} from '../types/dtos/auth.ts';

type UserInformation = {
  email: string;
  password: string;
};

const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

function validateUser(values: UserInformation) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!(values.password.length >= 8 && values.password.length < 16)) {
    errors.password = '비밀번호는 8~16자 사이로 입력해주세요.';
  }

  if (!passwordPattern.test(values.password)) {
    errors.password =
      '비밀번호는 8~16자리 영문, 숫자, 특수문자를 조합해야 합니다.';
  }

  return errors;
}

function validateLogin(values: UserInformation) {
  return validateUser(values);
}

function validateSignUpStep3(values: Pick<TSignup, 'nickname' | 'email'>) {
  const errors = {
    nickname: '',
    email: '',
  };

  if (!values.nickname.trim()) {
    errors.nickname = '이름을 입력해주세요.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  return errors;
}

type TSignUpValues = Pick<TSignup, 'password'> & {
  passwordCheck: string;
};

function validateSignUpStep4(values: TSignUpValues) {
  const errors = {
    password: '',
    passwordCheck: '',
  };

  if (!values.password) {
    errors.password = '비밀번호를 입력해주세요.';
  } else if (!passwordPattern.test(values.password)) {
    errors.password =
      '비밀번호는 8~16자리 영문, 숫자, 특수문자를 조합해야 합니다.';
  }

  if (!values.passwordCheck) {
    errors.passwordCheck = '비밀번호 확인을 입력해주세요.';
  } else if (values.password !== values.passwordCheck) {
    errors.passwordCheck = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
  }

  return errors;
}

// function validateAge(age: string): string {
//   const ageNumber = Number(age);
//   if (!age || isNaN(ageNumber) || ageNumber < 0 || ageNumber > 120) {
//     return '유효한 나이를 입력해주세요.';
//   }
//   return '';
// }

function validateSignUpStep5(values: Pick<TSignup, 'birth' | 'gender'>) {
  const errors = {
    gender: '',
    birth: '',
  };

  if (!['FEMALE', 'MALE'].includes(values.gender)) {
    errors.gender = '유효한 성별을 선택해주세요.';
  }

  return errors;
}

type TvalidateCalendarWrite = {
  title: string;
  location: string;
  locationDetail: string;
  memo: string;
};

function validateCalendarWrite(values: TvalidateCalendarWrite) {
  const errors = {
    title: '',
    location: '',
    locationDetail: '',
    memo: '',
  };

  if (!values.title?.trim()) {
    errors.title = '일정을 입력해주세요.';
  }

  if (!values.location?.trim()) {
    errors.location = '지역 정보를 입력해주세요.';
  }

  if (!values.locationDetail?.trim()) {
    errors.locationDetail = '상세 지역 정보를 입력해주세요.';
  }

  return errors;
}

type TValidateAddMoimPosts = {
  title: string;
  date: string;
  locationDetail: string;
  cost: string;
};

function validateAddMoimPosts(values: TValidateAddMoimPosts) {
  const errors = {
    title: '',
    date: '',
    locationDetail: '',
    cost: '',
  };

  if (values.title?.trim() === '') {
    errors.title = '제목을 입력해주세요.';
  }

  if (values.date?.trim() === '') {
    errors.date = '날짜를 입력해주세요.';
  }

  if (values.locationDetail?.trim() === '') {
    errors.locationDetail = '세부장소를 입력해주세요.';
  }

  if (values.cost?.trim() === '') {
    errors.cost = '비용을 입력해주세요.';
  }

  return errors;
}

type TValidateEditProfile = {
  nickname: string;
  residence: string;
  introduction: string;
};

function validateEditProfile(values: TValidateEditProfile) {
  const errors = {
    nickname: '',
    residence: '',
    introduction: '',
  };

  if (values.nickname?.trim()) {
    errors.nickname = '수정하실 닉네임을 입력해주세요.';
  }

  if (values.residence?.trim()) {
    errors.residence = '수정하실 거주지역을 입력해주세요.';
  }

  if (values.introduction?.trim()) {
    errors.introduction = '수정하실 소개 내용을 입력해주세요.';
  }

  return errors;
}

type TValidateTodo = {
  title: string;
  content: string;
};

function validateTodo(values: TValidateTodo) {
  const errors = {
    title: '',
    content: '',
  };

  if (!values.title?.trim()) {
    errors.title = '할 일 제목을 입력해주세요.';
  }

  if (!values.content?.trim()) {
    errors.content = '할 일 내용을 입력해주세요.';
  }

  return errors;
}

type TValidateReplyIssuse = {
  replyEmail: string;
  content: string;
};

function validateReplyIssue(values: TValidateReplyIssuse) {
  const errors = {
    replyEmail: '',
    content: '',
  };

  if (!values.replyEmail?.trim()) {
    errors.replyEmail = '회신 이메일을 입력해주세요.';
  }

  if (!values.content?.trim()) {
    errors.content = '문의사항 내용을 입력해주세요.';
  }

  return errors;
}

export {
  validateLogin,
  validateSignUpStep3,
  validateSignUpStep4,
  validateSignUpStep5,
  validateCalendarWrite,
  validateAddMoimPosts,
  validateEditProfile,
  validateTodo,
  validateReplyIssue,
};
