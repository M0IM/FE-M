import {MOIM_REQUEST_TYPE} from 'types/enums';

const CATEGORY_LIST: Record<string, MOIM_REQUEST_TYPE> = {
  스포츠: MOIM_REQUEST_TYPE.SPORTS,
  'IT/서울': MOIM_REQUEST_TYPE.TECH,
  '인문/책': MOIM_REQUEST_TYPE.HUMANITY,
  '외국/언어': MOIM_REQUEST_TYPE.LANGUAGE,
  공예: MOIM_REQUEST_TYPE.ARTICLE,
  봉사활동: MOIM_REQUEST_TYPE.VOLUNTEER,
  종교: MOIM_REQUEST_TYPE.RELIGION,
  '사진/영상': MOIM_REQUEST_TYPE.PHOTO,
  동물: MOIM_REQUEST_TYPE.ANIMAL,
  음악: MOIM_REQUEST_TYPE.MUSIC,
  '자기 계발': MOIM_REQUEST_TYPE.SELF,
};

const CATEGORIES_LIST: Record<MOIM_REQUEST_TYPE, string> = {
  [MOIM_REQUEST_TYPE.ALL]: '전체',
  [MOIM_REQUEST_TYPE.SPORTS]: '스포츠',
  [MOIM_REQUEST_TYPE.TECH]: 'IT/서울',
  [MOIM_REQUEST_TYPE.HUMANITY]: '인문/책',
  [MOIM_REQUEST_TYPE.LANGUAGE]: '외국/언어',
  [MOIM_REQUEST_TYPE.ARTICLE]: '공예',
  [MOIM_REQUEST_TYPE.VOLUNTEER]: '봉사활동',
  [MOIM_REQUEST_TYPE.RELIGION]: '종교',
  [MOIM_REQUEST_TYPE.PHOTO]: '사진/영상',
  [MOIM_REQUEST_TYPE.ANIMAL]: '동물',
  [MOIM_REQUEST_TYPE.MUSIC]: '음악',
  [MOIM_REQUEST_TYPE.SELF]: '자기 계발',
};

export const CATEGORIES_LIST_DATA = [
  {key: MOIM_REQUEST_TYPE.ALL, label: '전체'},
  {key: MOIM_REQUEST_TYPE.SPORTS, label: '스포츠'},
  {key: MOIM_REQUEST_TYPE.TECH, label: 'IT/서울'},
  {key: MOIM_REQUEST_TYPE.HUMANITY, label: '인문/책'},
  {key: MOIM_REQUEST_TYPE.LANGUAGE, label: '외국/언어'},
  {key: MOIM_REQUEST_TYPE.ARTICLE, label: '공예'},
  {key: MOIM_REQUEST_TYPE.VOLUNTEER, label: '봉사활동'},
  {key: MOIM_REQUEST_TYPE.RELIGION, label: '종교'},
  {key: MOIM_REQUEST_TYPE.PHOTO, label: '사진/영상'},
  {key: MOIM_REQUEST_TYPE.ANIMAL, label: '동물'},
  {key: MOIM_REQUEST_TYPE.MUSIC, label: '음악'},
  {key: MOIM_REQUEST_TYPE.SELF, label: '자기 계발'},
] as const;

export const CREATE_CATEGORIES_LIST_DATA = [
  {key: MOIM_REQUEST_TYPE.SPORTS, label: '스포츠'},
  {key: MOIM_REQUEST_TYPE.TECH, label: 'IT/서울'},
  {key: MOIM_REQUEST_TYPE.HUMANITY, label: '인문/책'},
  {key: MOIM_REQUEST_TYPE.LANGUAGE, label: '외국/언어'},
  {key: MOIM_REQUEST_TYPE.ARTICLE, label: '공예'},
  {key: MOIM_REQUEST_TYPE.VOLUNTEER, label: '봉사활동'},
  {key: MOIM_REQUEST_TYPE.RELIGION, label: '종교'},
  {key: MOIM_REQUEST_TYPE.PHOTO, label: '사진/영상'},
  {key: MOIM_REQUEST_TYPE.ANIMAL, label: '동물'},
  {key: MOIM_REQUEST_TYPE.MUSIC, label: '음악'},
  {key: MOIM_REQUEST_TYPE.SELF, label: '자기 계발'},
] as const;

export {CATEGORY_LIST, CATEGORIES_LIST};
