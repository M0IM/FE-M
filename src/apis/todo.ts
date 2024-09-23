import axiosInstance from './axiosInstance.ts';

import {
  TCreateTodoDTO,
  TCreateTodoResponse,
  TIndividualAssignmentTodoListResponse,
  TMyAssignmentTodoResponse,
  TMyTodoStatus,
  TODO_ASSIGNEE_STATUS,
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
  isAssigneeSelectAll,
}: TCreateTodoDTO): Promise<TCreateTodoResponse> => {
  const {data} = await axiosInstance.post(`/api/v1/moims/${moimId}/todos`, {
    moimId,
    title,
    content,
    dueDate,
    imageKeyList,
    targetUserIdList,
    isAssigneeSelectAll,
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
  if (moimId === -1) {
    return {
      nextCursor: 0,
      hasNext: false,
      list: [],
    };
  } else {
    const {data} = await axiosInstance.get(
      `/api/v1/moims/${moimId}/todos/admins?cursor=${cursor}&take=${take}`,
    );

    return data.result;
  }
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
  if (moimId === -1 || todoId === -1) {
    return {
      list: [],
      nextCursor: 0,
      hasNext: false,
    };
  } else {
    const {data} = await axiosInstance.get(
      `/api/v1/moims/${moimId}/todos/${todoId}/admins/assignee-list?cursor=${cursor}&take=${take}`,
    );

    return data.result;
  }
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
  if (moimId === -1) {
    return {
      list: [],
      nextCursor: 0,
      hasNext: false,
    };
  } else {
    const {data} = await axiosInstance.get(
      `/api/v1/moims/${moimId}/todos/by-me?cursor=${cursor}&take=${take}`,
    );

    return data.result;
  }
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
}: Pick<TCreateTodoDTO, 'moimId' | 'title' | 'content' | 'dueDate'> & {
  todoId: number;
  imageKeyList: string[] | null;
}): Promise<TCreateTodoResponse> => {
  const {data} = await axiosInstance.put(
    `/api/v1/moims/${moimId}/todos/admin/${todoId}`,
    {
      title,
      content,
      dueDate,
      imageKeyList,
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

const getMyAssignedTodo = async ({
  moimId,
  todoId,
}: {
  moimId: number;
  todoId: number;
}): Promise<TMyAssignmentTodoResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/${moimId}/todos/${todoId}/for-me`,
  );

  return data.result;
};

// PUT: 부여된 todo 상태 업데이트
const modifyMyTodoStatus = async ({
  moimId,
  todoId,
  todoAssigneeStatus,
}: {
  moimId: number;
  todoId: number;
  todoAssigneeStatus: TODO_ASSIGNEE_STATUS;
}): Promise<TMyTodoStatus> => {
  const {data} = await axiosInstance.put(
    `/api/v1/moims/${moimId}/todos/assignee/${todoId}`,
    {
      todoId,
      todoAssigneeStatus,
    },
  );

  return data.result;
};

// GET:todo 할당 받 멤버 제외한 모임 멤버 조회.
const getNoneAssignedMemberList = async ({
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
  if (moimId === -1 || todoId === -1) {
    return {
      list: [],
      nextCursor: 0,
      hasNext: false,
    };
  } else {
    const {data} = await axiosInstance.get(
      `/api/v1/moims/${moimId}/todos/${todoId}/admins/non-assignee-list?cursor=${cursor}&take=${take}`,
    );

    return data.result;
  }
};

// PUT: todo assignee 추가
const addTodoMember = async ({
  moimId,
  todoId,
  addAssigneeIdList,
}: {
  moimId: number;
  todoId: number;
  addAssigneeIdList: number[];
}) => {
  const {data} = await axiosInstance.put(
    `/api/v1/moims/todos/admin/assignees/new`,
    {
      moimId,
      todoId,
      addAssigneeIdList,
    },
  );

  return data.result;
};

// PUT: todo assignee 추가
const deleteTodoMember = async ({
  moimId,
  todoId,
  deleteAssigneeIdList,
}: {
  moimId: number;
  todoId: number;
  deleteAssigneeIdList: number[];
}) => {
  const {data} = await axiosInstance.put(
    `/api/v1/moims/todos/admin/assignees/current`,
    {
      moimId,
      todoId,
      deleteAssigneeIdList,
    },
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
  getMyAssignedTodo,
  modifyMyTodoStatus,
  getNoneAssignedMemberList,
  addTodoMember,
  deleteTodoMember,
};
