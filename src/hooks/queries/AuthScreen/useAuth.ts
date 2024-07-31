import {useEffect} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';

import {
  getAccessToken,
  getUserProfile,
  logout,
  postLogin,
  postSignup,
  socialLogin,
} from 'apis';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from 'types/mutations/common.ts';
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
    onSuccess: ({accessToken, refreshToken}) => {
      setHeader('Authorization', accessToken);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const {data, error, isSuccess, isError, isPending} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 2,
    // 시간 주기에 따라서, refetch를 하게 해주는 옵션
    refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 2,
    // 앱을 종료하지 않고, 다른 작업했다가 다시 들어오는 경우
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data?.result.accessToken}`);
      setEncryptStorage(storageKeys.ACCESS_TOKEN, data.result.accessToken);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.result.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError, error, data};
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useGetProfileQuery(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryFn: getUserProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    ...queryOptions,
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
  const getProfileQuery = useGetProfileQuery({
    enabled: getNewAccessToken.isSuccess,
  });

  return {
    signUpMutation,
    loginMutation,
    socialIdTokenMutation,
    isLogin,
    logoutMutation,
    isLoginLoading,
    getProfileQuery,
  };
}

export default useAuth;
