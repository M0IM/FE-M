import axiosInstance from './axiosInstance.ts';

import {
  TCreateTodoDTO,
  TCreateTodoResponse,
  TTodoListResponse,
} from 'types/dtos/todo.ts';

// POST: 모임 todo 생성
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

// GET: 특정 모임의 todo 리스트 조회 (모임 관리자)
const getMoimTodoList = async ({
  moimId,
  cursor,
  take,
}: {
  moimId: number;
  cursor: number;
  take: number;
}): Promise<TTodoListResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/${moimId}/todos/admins?cursor=${cursor}&take=${take}`,
  );

  return data.result;
};

export {createMoimTodo, getMoimTodoList};
