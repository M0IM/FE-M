import axiosInstance from './axiosInstance.ts';

import {
  TCreateTodoDTO,
  TCreateTodoResponse,
  TIndividualAssignmentTodoListResponse,
  TTodoDetailDTO,
  TTodoListResponse,
  TTodoParticipantResponse,
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

// GET: todo 할당 받은 멤버 리스트 조회 (모임 관리자)
const getDetailTodo = async ({
  moimId,
  todoId,
}: {
  moimId: number;
  todoId: number;
}): Promise<TTodoDetailDTO> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/${moimId}/todos/${todoId}/admins/detail`,
  );

  return data.result;
};

// GET: TODO 할당받은 멤버 리스트 조회(모임 관리자)
const getDetailTodoMemberList = async ({
  moimId,
  todoId,
  cursor,
  take,
}: {
  moimId: number;
  todoId: number;
  cursor: number;
  take: number;
}): Promise<TTodoParticipantResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/${moimId}/todos/${todoId}/admins/assignee-list?cursor=${cursor}&take=${take}`,
  );

  return data.result;
};

// GET: 특정 모임 관리자 회원이 부여한 todo 리스트 조회 (모임 관리자)
const getIndividualAssignmentTodoList = async ({
  moimId,
  cursor,
  take,
}: {
  moimId: number;
  cursor: number;
  take: number;
}): Promise<TIndividualAssignmentTodoListResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/${moimId}/todos/by-me?cursor=${cursor}&take=${take}`,
  );

  return data.result;
};

// GET: 내가 부여한 TODO 확인
const getMyAssignmentTodoList = async ({
  cursor,
  take,
}: {
  cursor: number;
  take: number;
}): Promise<TIndividualAssignmentTodoListResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/todos/by-me?cursor=${cursor}&take=${take}`,
  );

  return data.result;
};

// PUT: TODO 수정
const modifyMoimTodo = async ({
  moimId,
  todoId,
  title,
  content,
  dueDate,
  imageKeyList,
  targetUserIdList,
  isAssignedSelectAll,
}: TCreateTodoDTO & {todoId: number}): Promise<TCreateTodoResponse> => {
  const {data} = await axiosInstance.put(
    `/api/v1/moims/${moimId}/todos/admin/${todoId}`,
    {
      moimId,
      title,
      content,
      dueDate,
      imageKeyList,
      targetUserIdList,
      isAssignedSelectAll,
    },
  );

  return data.result;
};
// DELETE: TODO 삭제
const deleteMoimTodo = async ({
  moimId,
  todoId,
}: {
  moimId: number;
  todoId: number;
}) => {
  const {data} = await axiosInstance.delete(
    `/api/v1/moims/${moimId}/todos/admin/${todoId}`,
  );

  return data.result;
};

export {
  createMoimTodo,
  getMoimTodoList,
  getDetailTodo,
  getDetailTodoMemberList,
  getIndividualAssignmentTodoList,
  getMyAssignmentTodoList,
  modifyMoimTodo,
  deleteMoimTodo,
};
