import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';

import useTodo from 'hooks/useTodo.ts';

export default function CalendarTodoDetailScreen() {
  const {useGetMyAssignedTodo, modifyMyTodoStatus} = useTodo();
  const {data: todo} = useGetMyAssignedTodo();
  return (
    <ScreenContainer>
      <Typography fontWeight={'BOLD'}>HI</Typography>
    </ScreenContainer>
  );
}
