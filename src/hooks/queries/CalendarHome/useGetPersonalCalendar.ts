import {useQuery} from '@tanstack/react-query';
import {getPersonalCalendar} from 'apis';

function useGetPersonalCalendar({month, year}: {month: number; year: number}) {
  const {data, isPending, isError} = useQuery({
    queryFn: () => getPersonalCalendar({month, year}),
    queryKey: ['calendar'],
  });

  return {data, isPending, isError};
}

export {useGetPersonalCalendar};
