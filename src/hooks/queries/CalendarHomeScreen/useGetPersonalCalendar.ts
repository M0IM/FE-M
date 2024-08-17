import {useQuery} from '@tanstack/react-query';
import {getPersonalCalendar, TCalndarProps} from 'apis';

function useGetPersonalCalendar({month, year}: Omit<TCalndarProps, 'moimId'>) {
  const {data, isPending, isError} = useQuery({
    queryFn: () => getPersonalCalendar({month, year}),
    queryKey: ['myCalendar', month, year],
  });

  return {data, isPending, isError};
}

export {useGetPersonalCalendar};
