import {MOIM_JOIN_STATUS} from 'types/enums';

const JOIN_STATUS_LIST: Record<MOIM_JOIN_STATUS, string> = {
  [MOIM_JOIN_STATUS.COMPLETE]: '완료',
  [MOIM_JOIN_STATUS.DELETED]: '삭제',
  [MOIM_JOIN_STATUS.LOADING]: '확인 중',
  [MOIM_JOIN_STATUS.REJECT]: '반려',
};

export {JOIN_STATUS_LIST};
