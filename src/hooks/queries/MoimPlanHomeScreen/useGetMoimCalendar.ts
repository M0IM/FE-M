import {useQuery} from '@tanstack/react-query';
import {getMoimCalendar, TCalndarProps} from 'apis';

function useGetMoimCalendar({moimId, month, year}: TCalndarProps) {
  const {data, isPending, isError} = useQuery({
    queryFn: () => getMoimCalendar({moimId, month, year}),
    queryKey: ['moimCalendar', moimId, month, year],
  });

  return {data, isPending, isError};
}

export {useGetMoimCalendar};
