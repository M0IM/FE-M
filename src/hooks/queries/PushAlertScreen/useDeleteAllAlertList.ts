import {useMutation, UseMutationOptions} from '@tanstack/react-query';

import {deleteAllAlertList} from 'apis';

function useDeleteAllAlertList(mutationOptions?: UseMutationOptions) {
  return useMutation({
    mutationFn: deleteAllAlertList,
    ...mutationOptions,
  });
}

export default useDeleteAllAlertList;
