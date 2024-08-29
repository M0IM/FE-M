import axiosInstance from './axiosInstance.ts';

import {
  TChatListResponse,
  TChatRoomResponse,
  TCreateChatRoomDTO,
  TCreateChatRoomResponse,
  TModifyChatRoomDTO,
} from 'types/dtos/chat.ts';

// 채팅방 불러오기 API
// TODO: 백엔드한테 moimId 뺴달라하기.
const getChatRooms = async (cursor: number): Promise<TChatRoomResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/chat-rooms?cursor=${cursor}&take=7`,
  );

  return data.result;
};

// 채팅방 생성하기 API
const createChatRoom = async ({
  title,
  imageKeyName,
  roomParticipantIds,
}: TCreateChatRoomDTO): Promise<TCreateChatRoomResponse> => {
  const {data} = await axiosInstance.post(`/api/v1/chat-rooms`, {
    title,
    imageKeyName,
    roomParticipantIds,
  });

  return data.result;
};

// 채팅방 수정하기 API
const modifyChatRoom = async ({
  chatRoomId,
  title,
  imageKeyName,
}: TModifyChatRoomDTO): Promise<TCreateChatRoomResponse> => {
  const {data} = await axiosInstance.patch(`/api/v1/chat-rooms`, {
    chatRoomId,
    title,
    imageKeyName,
  });

  return data.result;
};

// 채팅방 나가기
const exitChatRoom = async ({chatRoomId}: {chatRoomId: number}) => {
  const {data} = await axiosInstance.post(`/api/v1/chat-rooms`, {
    chatRoomId,
  });

  return data;
};

// 채팅방 목록 불러오기
const getChatList = async ({
  chatRoomId,
  cursor,
}: {
  chatRoomId: number;
  cursor: number;
}): Promise<TChatListResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/chat-rooms/${chatRoomId}/chats?cursor=${cursor}&take=5`,
  );

  return data.result;
};

export {
  getChatRooms,
  createChatRoom,
  modifyChatRoom,
  exitChatRoom,
  getChatList,
};
