import axios from 'axios';
import Config from 'react-native-config';

import axiosInstance from './axiosInstance.ts';
import {getEncryptStorage, removeEncryptStorage, removeHeader} from 'utils';
import {storageKeys} from 'constants/storageKeys/keys.ts';
import {
  TGetAccessToken,
  TLogin,
  TLogout,
  TResponseSignup,
  TSignup,
  TSocial,
} from 'types/dtos/auth.ts';
import {
  appleAuth,
  AppleCredentialState,
  AppleRequestResponse,
} from '@invertase/react-native-apple-authentication';

/**
 * @docs 회원가입 API
 */
const postSignup = async ({
  provider,
  providerId,
  nickname,
  email,
  password,
  role,
  gender,
  birth,
  residence,
}: TSignup): Promise<TResponseSignup> => {
  const {data} = await axiosInstance.post('/api/v1/auth/join', {
    provider,
    providerId,
    nickname,
    email,
    password,
    role,
    gender,
    birth,
    residence,
  });
  return data;
};

/**
 * @docs 로그인 API
 */
const postLogin = async ({
  email,
  password,
}: TLogin): Promise<TResponseSignup> => {
  const {data} = await axiosInstance.post('/api/v1/auth/login', {
    email,
    password,
  });

  return data;
};

/**
 * @docs 소셜 로그인 API
 */
const socialLogin = async ({
  type,
  idToken,
}: TSocial): Promise<TResponseSignup> => {
  const {data} = await axiosInstance.post(`/api/v1/auth/oAuth`, {
    provider: type,
    token: idToken,
  });

  return data;
};

/**
 * @docs 로그아웃 API
 */
const logout = async (): Promise<TLogout> => {
  const {data} = await axiosInstance.get('/api/v1/auth/logout');
  await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
  removeHeader('Authorization');

  return data;
};

/**
 * @docs refreshToken을 활용하여, accessToken을 재발급받는 API
 */
const getAccessToken = async (): Promise<TGetAccessToken> => {
  const refreshToken = await getEncryptStorage(storageKeys.REFRESH_TOKEN);

  const {data} = await axios.get(
    `${Config.SERVER_URL}/api/v1/auth/reissueToken`,
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  return data;
};

const appleClient = {
  fetchLogin: async (): Promise<AppleRequestResponse> => {
    const response = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    return response;
  },

  getUserAuthState: async (user: string) => {
    const response: AppleCredentialState =
      await appleAuth.getCredentialStateForUser(user);

    return response;
  },
};

export {
  postSignup,
  postLogin,
  socialLogin,
  logout,
  getAccessToken,
  appleClient,
};
