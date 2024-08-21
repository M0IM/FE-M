import {
  TGetMoimMembers,
  TMoimMembersParams,
  TMoimRequestUsers,
  TMoimRequestUsersParams,
  TUpdateMoimAuthorities,
  TUpdateMoimAuthoritiesParams,
  TUpdateMoimInfoParams,
} from 'types/dtos/moimManage';
import axiosInstance from './axiosInstance';

const getMoimRequestUsers = async ({
  moimId,
  cursor,
  take,
}: TMoimRequestUsersParams): Promise<TMoimRequestUsers> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/${moimId}/requests/users?cursor=${cursor}&take=${take}`,
  );
  console.log(data);
  return data?.result;
};

const updateMoimAuthorities = async ({
  moimId,
  moimRole,
  userId,
}: TUpdateMoimAuthoritiesParams): Promise<TUpdateMoimAuthorities> => {
  const {data} = await axiosInstance.patch(
    `/api/v1/moims/${moimId}/authorities`,
    {
      moimId,
      moimRole,
      userId,
    },
  );
  console.log(data);
  return data?.result;
};

const acceptMoimJoinRequest = async ({
  moimId,
  userId,
}: {
  moimId: number;
  userId: number;
}): Promise<string> => {
  const {data} = await axiosInstance.post(`/api/v1/moims/${moimId}/accept`, {
    moimId,
    userId,
  });
  console.log(data);
  return data?.result;
};

const updateMoimInfo = async ({
  moimId,
  title,
  address,
  category,
  description,
  imageKeyName,
}: TUpdateMoimInfoParams): Promise<string> => {
  console.log({
    moimId,
    title,
    address,
    category,
    description,
    imageKeyName,
  });
  const {data} = await axiosInstance.put(`/api/v1/moims`, {
    moimId,
    title,
    address,
    category,
    description,
    imageKeyName,
  });
  console.log(data);
  return data?.result;
};

const getMoimMembers = async ({
  moimId,
  cursor,
  take,
}: TMoimMembersParams): Promise<TGetMoimMembers> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/${moimId}/members?cursor=${cursor}&take=${take}`,
  );
  console.log(data);
  return data?.result;
};

const rejectMoimJoinRequest = async ({
  moimId,
  userId,
}: {
  moimId: number;
  userId: number;
}) => {
  const {data} = await axiosInstance.post(`/api/v1/moims/users/reject`, {
    moimId,
    userId,
  });
  return data?.result;
};

export {
  getMoimRequestUsers,
  updateMoimAuthorities,
  acceptMoimJoinRequest,
  updateMoimInfo,
  getMoimMembers,
  rejectMoimJoinRequest,
};
