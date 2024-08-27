export const POST_WRITE_LIST = [
  {label: '공지사항', key: 'ANNOUNCEMENT'},
  {label: '활동 후기', key: 'REVIEW'},
  {label: '가입 인사', key: 'WELCOME'},
  {label: '자유', key: 'FREE'},
];

export const POST_WRITE_MEMBER_LIST = [
  {label: '활동 후기', key: 'REVIEW'},
  {label: '가입 인사', key: 'WELCOME'},
  {label: '자유', key: 'FREE'},
];

export const POST_TYPES = [
  {key: 'ANNOUNCEMENT', label: '공지'},
  {key: 'REVIEW', label: '활동 후기'},
  {key: 'WELCOME', label: '가입 인사'},
  {key: 'FREE', label: '자유'},
] as const;

export const BOARD_TITLES = [
  {key: 'ALL', label: '전체'},
  {key: 'ANNOUNCEMENT', label: '공지'},
  {key: 'REVIEW', label: '활동 후기'},
  {key: 'WELCOME', label: '가입 인사'},
  {key: 'FREE', label: '자유'},
] as const;

export const POST_LIST = ['전체', '공지사항', '활동 후기', '가입 인사', '자유'];
