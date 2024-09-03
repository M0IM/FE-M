type TCreateTodoDTO = {
  moimId: number;
  title: string;
  content: string;
  dueDate: string;
  imageKeyList: string[];
  targetUserIdList: number[];
  isAssignedSelectAll: boolean;
};

type TCreateTodoResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: number;
};

type TTodoListDTO = {
  todoId: number;
  title: string;
  dueDate: Date;
  writerNickname: string;
  writerProfileImageUrl: string;
  writerMoimRole: string;
  moimId: number;
  moimName: string;
  imageUrlList: string[];
};

type TTodoListResponse = {
  nextCursor: number;
  hasNext: boolean;
  list: TTodoListDTO[];
};

type TTodoDetailDTO = {
  todoId: number;
  title: string;
  content: string;
  dueDate: Date;
  imageUrlList: string[];
  status: 'LOADING' | 'COMPLETE';
};

type TTodoParticipantMemberListDTO = {
  assigneeId: number;
  nickname: string;
  profileImageUrl: string;
  todoStatus: 'LOADING' | 'COMPLETE';
};

type TTodoParticipantResponse = {
  list: TTodoParticipantMemberListDTO[];
  nextCursor: number;
  hasNext: boolean;
};

type TIndividualAssignmentTodoListDTO = {
  todoId: number;
  title: string;
  dueDate: Date;
  writerNickname: string;
  writerProfileImageUrl: string;
  writerMoimRole: string;
  moimId: number;
  moimName: string;
  imageUrlList: string[];
};

type TIndividualAssignmentTodoListResponse = {
  list: TIndividualAssignmentTodoListDTO[];
  nextCursor: number;
  hasNext: boolean;
};

export type {
  TCreateTodoDTO,
  TCreateTodoResponse,
  TTodoListResponse,
  TTodoDetailDTO,
  TTodoParticipantMemberListDTO,
  TTodoParticipantResponse,
  TIndividualAssignmentTodoListResponse,
};