import axiosInstance from './axiosInstance.ts';

import {TCreateTodoDTO, TCreateTodoResponse} from 'types/dtos/todo.ts';

const createMoimTodo = async ({
  moimId,
  title,
  content,
  dueDate,
  imageKeyList,
  targetUserIdList,
  isAssignedSelectAll,
}: TCreateTodoDTO): Promise<TCreateTodoResponse> => {
  const {data} = await axiosInstance.post(`/api/v1/moims/${moimId}/todos`, {
    moimId,
    title,
    content,
    dueDate,
    imageKeyList,
    targetUserIdList,
    isAssignedSelectAll,
  });

  return data.result;
};

export {createMoimTodo};
