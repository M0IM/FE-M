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
};

type TAlarmResponse = {
  nextCursor: number;
  hasNext: boolean;
  alarmResponseDTOList: TAlarmResponseDTOList[];
};

export type {TAlertStatusDTO, TAlarmResponse};
