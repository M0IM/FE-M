import {useMutation, UseMutationOptions} from '@tanstack/react-query';

import {deleteAllAlertList} from 'apis';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';

function useDeleteAllAlertList(mutationOptions?: UseMutationOptions) {
  return useMutation({
    mutationFn: deleteAllAlertList,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['alert']});
      queryClient.invalidateQueries({queryKey: ['alertCount']});
    },
    ...mutationOptions,
  });
}

export default useDeleteAllAlertList;
