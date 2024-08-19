export type TMoimRole = 'OWNER' | 'ADMIN' | 'MEMBER';

export type TUserPreviewDTOList = {
    userId: number;
    nickname: string;
    imageKeyName: string;
    moimRole: TMoimRole;
}

type TMoimRequestUsers = {
    userPreviewDTOList: TUserPreviewDTOList[];
    hasNext: boolean;
    nextCursor: number;
}

type TUpdateMoimAuthorities = {
    userId: number;
    moimRole: TMoimRole;
}

type TGetMoimMembers = {
    userPreviewDTOList: TUserPreviewDTOList[];
    hasNext: boolean;
    nextCursor: number;
}

type TMoimRequestUsersParams = {
    moimId: number;
    cursor: number;
    take: number;
}

type TMoimMembersParams = {
    moimId: number,
    cursor: number;
    take: number;
}

type TUpdateMoimAuthoritiesParams = {
    moimId: number;
    moimRole: TMoimRole;
    userId: number;
}

type TUpdateMoimInfoParams = {
    moimId: number;
    title: string;
    address: string;
    category: string;
    description: string;
    imageKeyNames: string[];
}

export type {
    TMoimRequestUsersParams,
    TUpdateMoimAuthoritiesParams,
    TUpdateMoimInfoParams,
    TMoimMembersParams,
    TMoimRequestUsers,
    TUpdateMoimAuthorities,
    TGetMoimMembers
};