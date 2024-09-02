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

export type {TCreateTodoDTO, TCreateTodoResponse, TTodoListResponse};
