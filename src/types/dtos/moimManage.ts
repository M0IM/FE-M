import {MOIM_ROLE} from 'types/enums';

export type TMoimRole = MOIM_ROLE.ADMIN | MOIM_ROLE.MEMBER | MOIM_ROLE.OWNER;

export type TUserPreviewDTOList = {
  userId: number;
  nickname: string;
  imageKeyName: string;
  moimRole: TMoimRole;
};

type TMoimRequestUsers = {
  userPreviewDTOList: TUserPreviewDTOList[];
  hasNext: boolean;
  nextCursor: number;
};

type TUpdateMoimAuthorities = {
  userId: number;
  moimRole: TMoimRole;
};

type TGetMoimMembers = {
  userPreviewDTOList: TUserPreviewDTOList[];
  hasNext: boolean;
  nextCursor: number;
};

type TMoimRequestUsersParams = {
  moimId: number;
  cursor: number;
  take: number;
  search: string;
};

type TMoimMembersParams = {
  moimId: number;
  cursor: number;
  take: number;
  search: string;
};

type TUpdateMoimAuthoritiesParams = {
  moimId: number;
  moimRole: TMoimRole;
  userId: number;
};

type TUpdateMoimInfoParams = {
  moimId: number;
  title: string;
  address: string;
  moimCategory: string;
  description: string;
  imageKeyName: string;
};

export type {
  TMoimRequestUsersParams,
  TUpdateMoimAuthoritiesParams,
  TUpdateMoimInfoParams,
  TMoimMembersParams,
  TMoimRequestUsers,
  TUpdateMoimAuthorities,
  TGetMoimMembers,
};
