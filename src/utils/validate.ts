import {TJoinRequestDto} from '../types/dtos/auth.ts';

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

  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
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

function validateSignUpStep3(
  values: Pick<TJoinRequestDto, 'nickname' | 'email'>,
) {
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

type TSignUpValues = Pick<TJoinRequestDto, 'password' | 'passwordCheck'>;

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

function validateSignUpStep5(
  values: Pick<TJoinRequestDto, 'birth' | 'gender' | 'residence'>,
) {
  const errors = {
    gender: '',
    birth: '',
    residence: '',
  };

  if (!['FEMALE', 'MALE'].includes(values.gender)) {
    errors.gender = '유효한 성별을 선택해주세요.';
  }

  // errors.birth = validateAge(values.birth);

  if (!values.residence.trim()) {
    errors.residence = '거주지를 입력해주세요.';
  }

  return errors;
}

export {
  validateLogin,
  validateSignUpStep3,
  validateSignUpStep4,
  validateSignUpStep5,
};
