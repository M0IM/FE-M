export type TJoinRequestDto = {
  nickname: string;
  email: string;
  password: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  gender: 'FEMALE' | 'MALE';
  age: number;
  birth: Date;
  residence: string;
};
