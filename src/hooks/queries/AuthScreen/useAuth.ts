import {useEffect} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';

import {
  deleteUser,
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
  numbers,
  removeEncryptStorage,
  removeHeader,
  setEncryptStorage,
  setHeader,
} from 'utils';
import {queryKeys, storageKeys} from 'constants/storageKeys/keys.ts';
import Toast from 'react-native-toast-message';
import {TMyProfileResponse} from '../../../types/dtos/user.ts';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: data => {
      // 토큰 저장.
      const accessToken = data.result.accessToken;
      const refreshToken = data.result.refreshToken;
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptStorage(storageKeys.ACCESS_TOKEN, accessToken);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
      Toast.show({
        type: 'success',
        text1: data.message ? data.message : '회원가입 성공',
        visibilityTime: 2000,
        position: 'bottom',
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error?.response?.data.message,
        visibilityTime: 2000,
        position: 'bottom',
      });
    },
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

      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error?.response?.data.message,
        visibilityTime: 2000,
        position: 'bottom',
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
      setEncryptStorage(storageKeys.REFRESH_TOKEN, result.refreshToken);
      setHeader('Authorization', `Bearer ${result.accessToken}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, 'profile'],
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error?.response?.data.message,
        visibilityTime: 2000,
        position: 'bottom',
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

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.result.accessToken}`);
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

  return {isSuccess, isError, error, data, isPending};
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: data => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
      // queryClient.resetQueries({queryKey: [queryKeys.AUTH, 'getAccessToken']});
      // queryClient.clear();
      Toast.show({
        type: 'success',
        text1: data.message && '로그아웃에 성공하였습니다.',
        visibilityTime: 2000,
        position: 'bottom',
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error?.response?.data.message,
        visibilityTime: 2000,
        position: 'bottom',
      });
    },
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useDeleteUser(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: data => {
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      removeHeader('Authorization');
      queryClient.resetQueries({queryKey: [queryKeys.AUTH, 'getAccessToken']});
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
      queryClient.clear();
      Toast.show({
        type: 'success',
        text1: data.message,
        visibilityTime: 2000,
        position: 'bottom',
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error?.response?.data.message,
        visibilityTime: 2000,
        position: 'bottom',
      });
    },
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useGetProfile(
  queryOptions?: UseQueryCustomOptions<TMyProfileResponse>,
) {
  return useQuery({
    queryFn: getUserProfile,
    queryKey: [queryKeys.AUTH, 'profile'],
    ...queryOptions,
  });
}

function useAuth() {
  const signUpMutation = useSignup();
  const loginMutation = useLogin();
  const socialIdTokenMutation = useSocialIdTokenLogin();
  const getNewAccessToken = useGetRefreshToken();
  const logoutMutation = useLogout();
  const deleteUserMutation = useDeleteUser();
  const getProfileQuery = useGetProfile({
    enabled: getNewAccessToken.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const isLoginLoading = getNewAccessToken.isPending;

  return {
    signUpMutation,
    loginMutation,
    socialIdTokenMutation,
    isLogin,
    logoutMutation,
    deleteUserMutation,
    isLoginLoading,
    getNewAccessToken,
    getProfileQuery,
  };
}

export default useAuth;
