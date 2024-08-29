type TAlertStatusDTO = {
  isPushAlarm: boolean;
  isEventAlarm: boolean;
};

type TAlarmResponseDTOList = {
  alarmId: number;
  title: string;
  content: string;
  alarmDetailType: 'COMMENT' | 'POST' | 'CHATROOM' | 'MOIM';
  targetId: number;
  createdAt: string;
  moimId: number;
  postId: number;
};

type TAlarmResponse = {
  nextCursor: number;
  hasNext: boolean;
  alarmResponseDTOList: TAlarmResponseDTOList[];
};

type TAlarmCountResponse = {
  remainAlarms: number;
};

export type {TAlertStatusDTO, TAlarmResponse, TAlarmCountResponse};
