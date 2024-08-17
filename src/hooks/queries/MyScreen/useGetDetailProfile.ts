import {useQuery} from '@tanstack/react-query';
import {getUserDetailProfile} from '../../../apis';

function useGetDetailProfile(userId: number) {
  const {data, isPending, isError} = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUserDetailProfile(userId),
    staleTime: Infinity,
  });

  return {data, isPending, isError};
}

export {useGetDetailProfile};
