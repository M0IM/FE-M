import {useMutation} from '@tanstack/react-query';

import {createChatRoom} from 'apis/chat.ts';
import {UseMutationCustomOptions} from 'types/mutations/common.ts';

function useCreateChatRoom(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createChatRoom,
    ...mutationOptions,
    onError: error => console.log(error),
  });
}

export default useCreateChatRoom;
