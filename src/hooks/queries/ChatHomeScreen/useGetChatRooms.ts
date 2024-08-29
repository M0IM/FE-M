import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import {TChatRoomResponse} from 'types/dtos/chat.ts';
import {ResponseError} from 'types/mutations/common.ts';
import {getChatRooms} from 'apis/chat.ts';

function useGetChatRooms(
  queryOptions?: UseInfiniteQueryOptions<
    TChatRoomResponse,
    ResponseError,
    InfiniteData<TChatRoomResponse, number>,
    TChatRoomResponse,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) => getChatRooms(pageParam),
    queryKey: ['chatRooms'],
    initialPageParam: 1,
    getNextPageParam: (lastPage, _) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

export {useGetChatRooms};
