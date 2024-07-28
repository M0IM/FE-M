export type TJoinRequestDto = {
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  gender: 'FEMALE' | 'MALE';
  age: string;
  birth: string;
  residence: string;
};
