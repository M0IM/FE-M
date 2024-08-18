import {MOIM_REQUEST_TYPE} from 'types/enums';

export const CATEGORY_LIST: Record<string, MOIM_REQUEST_TYPE> = {
  전체: MOIM_REQUEST_TYPE.ALL,
  스포츠: MOIM_REQUEST_TYPE.SPORTS,
  'IT/서울': MOIM_REQUEST_TYPE.TECH,
  '인문/책': MOIM_REQUEST_TYPE.HUMANITY,
  '외국/언어': MOIM_REQUEST_TYPE.RELIGION,
  공예: MOIM_REQUEST_TYPE.ARTICLE,
  봉사활동: MOIM_REQUEST_TYPE.VOLUNTEER,
  종교: MOIM_REQUEST_TYPE.RELIGION,
  '사진/영상': MOIM_REQUEST_TYPE.PHOTO,
  동물: MOIM_REQUEST_TYPE.ANIMAL,
  음악: MOIM_REQUEST_TYPE.MUSIC,
  '자기 계발': MOIM_REQUEST_TYPE.SELF,
};

export const CATEGORY_MENU_LIST = [
  '스포츠',
  'IT/서울',
  '인문/책',
  '외국/언어',
  '공예',
  '봉사활동',
  '종교',
  '사진/영상',
  '동물',
  '음악',
  '자기 계발',
];
