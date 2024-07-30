import {useEffect} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';

import {getAccessToken, logout, postLogin, postSignup, socialLogin} from 'apis';
import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {
  removeEncryptStorage,
  removeHeader,
  setEncryptStorage,
  setHeader,
  numbers,
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
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      setEncryptStorage(storageKeys.ACCESS_TOKEN, accessToken);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useSocialIdTokenLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: socialLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage(storageKeys.ACCESS_TOKEN, accessToken);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    ...mutationOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.ACCESS_TOKEN);
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const {data, isSuccess, isError, isPending} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError, isPending};
}

function useAuth() {
  const signUpMutation = useSignup();
  const loginMutation = useLogin();
  const socialIdTokenMutation = useSocialIdTokenLogin();
  const refreshTokenQuery = useGetRefreshToken();
  const isLogin = refreshTokenQuery.isSuccess;
  const logoutMutation = useLogout();
  const isLoginLoading = refreshTokenQuery.isPending;

  return {
    signUpMutation,
    loginMutation,
    socialIdTokenMutation,
    isLogin,
    logoutMutation,
    isLoginLoading,
  };
}

export default useAuth;
