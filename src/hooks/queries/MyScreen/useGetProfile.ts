import {useQuery} from '@tanstack/react-query';
import {getUserProfile} from '../../../apis';

function useGetMyProfile() {
  const {data, isPending, isError} = useQuery({
    queryKey: ['me'],
    queryFn: getUserProfile,
  });

  return {data, isPending, isError};
}

export {useGetMyProfile};
