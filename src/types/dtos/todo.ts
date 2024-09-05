type TCreateTodoDTO = {
  moimId: number;
  title: string;
  content: string;
  dueDate: string;
  imageKeyList: string[];
  targetUserIdList: number[];
  isAssigneeSelectAll: boolean;
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
  todoStatus: TODO_STATUS;
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

export enum TODO_ASSIGNEE_STATUS {
  LOADING = 'LOADING',
  COMPLETE = 'COMPLETE',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE',
}

export enum TODO_STATUS {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
}

type TTodoParticipantMemberListDTO = {
  assigneeId: number;
  nickname: string;
  profileImageUrl: string;
  todoAssigneeStatus: TODO_ASSIGNEE_STATUS;
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
  todoStatus: TODO_STATUS;
};

type TIndividualAssignmentTodoListResponse = {
  list: TIndividualAssignmentTodoListDTO[];
  nextCursor: number;
  hasNext: boolean;
};

type TMyAssignmentTodoResponse = {
  todoId: number;
  title: string;
  content: string;
  dueDate: Date;
  imageUrlList: string[];
  todoAssigneeStatus: TODO_ASSIGNEE_STATUS;
  todoStatus: TODO_STATUS;
};

type TMyTodoStatus = {
  todoId: number;
  todoAssigneeStatus: TODO_ASSIGNEE_STATUS;
  todoStatus: TODO_STATUS;
};

export type {
  TCreateTodoDTO,
  TCreateTodoResponse,
  TTodoListResponse,
  TTodoDetailDTO,
  TTodoParticipantMemberListDTO,
  TTodoParticipantResponse,
  TIndividualAssignmentTodoListResponse,
  TMyAssignmentTodoResponse,
  TMyTodoStatus,
};
