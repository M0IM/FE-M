import {useEffect} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';

import {getAccessToken, logout, postLogin, postSignup, socialLogin} from 'apis';
import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {
  numbers,
  removeEncryptStorage,
  removeHeader,
  setEncryptStorage,
  setHeader,
} from 'utils';
import {queryKeys, storageKeys} from 'constants/storageKeys/keys.ts';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: data => {
      // 토큰 저장.
      const accessToken = data.result.accessToken;
      const refreshToken = data.result.refreshToken;

      setEncryptStorage(storageKeys.ACCESS_TOKEN, accessToken);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);

      setHeader('Authorization', accessToken);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useSocialIdTokenLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: socialLogin,
    onSuccess: ({result}) => {
      setHeader('Authorization', result.accessToken);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, result.refreshToken);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const {data, error, isSuccess, isError, isPending} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });
  console.log(isSuccess, '싫어');

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data?.result.accessToken}`);
      setEncryptStorage(storageKeys.ACCESS_TOKEN, data.result.accessToken);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.result.refreshToken);
      console.log(isSuccess, '성공');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError, error, data, isPending};
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      removeHeader('Authorization');
      queryClient.resetQueries({queryKey: [queryKeys.AUTH, 'getAccessToken']});
    },
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useAuth() {
  const signUpMutation = useSignup();
  const loginMutation = useLogin();
  const socialIdTokenMutation = useSocialIdTokenLogin();
  const getNewAccessToken = useGetRefreshToken();
  const logoutMutation = useLogout();
  const isLogin = getNewAccessToken.isSuccess;
  const isLoginLoading = getNewAccessToken.isPending;

  return {
    signUpMutation,
    loginMutation,
    socialIdTokenMutation,
    isLogin,
    logoutMutation,
    isLoginLoading,
    getNewAccessToken,
  };
}

export default useAuth;
