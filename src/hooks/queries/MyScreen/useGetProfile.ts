import {useQuery} from '@tanstack/react-query';
import {getUserProfile} from '../../../apis';

function useGetMyProfile() {
  const {data, isPending, isError, refetch} = useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfile,
    staleTime: Infinity,
  });

  return {data, isPending, isError, refetch};
}

export {useGetMyProfile};
