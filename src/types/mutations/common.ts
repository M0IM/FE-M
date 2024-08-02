import {AxiosError} from 'axios';
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>;

type CommonResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type {
  ResponseError,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
  CommonResponse,
};
