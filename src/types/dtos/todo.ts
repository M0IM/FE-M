type TCreateTodoDTO = {
  moimId: number;
  title: string;
  content: string;
  dueDate: Date;
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

export type {TCreateTodoDTO, TCreateTodoResponse};
