import {MOIM_ROLE} from 'types/enums';

const MOIM_ROLE_LIST: Record<string, MOIM_ROLE> = {
  전체: MOIM_ROLE.ALL,
  모임장: MOIM_ROLE.OWNER,
  관리자: MOIM_ROLE.ADMIN,
  멤버: MOIM_ROLE.MEMBER,
};

const MOIM_ROLES: Record<MOIM_ROLE, string> = {
  [MOIM_ROLE.ALL]: '전체',
  [MOIM_ROLE.OWNER]: '모임장',
  [MOIM_ROLE.ADMIN]: '관리자',
  [MOIM_ROLE.MEMBER]: '멤버',
};

export {MOIM_ROLE_LIST, MOIM_ROLES};
