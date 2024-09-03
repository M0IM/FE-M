import moment from 'moment';
import FastImage from 'react-native-fast-image';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {DetailItem} from './components/DetailItem.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import Label from 'components/@common/Label/Label.tsx';

import useTodo from 'hooks/useTodo.ts';
import {TODO_ASSIGNEE_STATUS} from 'types/dtos/todo.ts';

export default function CalendarTodoDetailScreen() {
  const {useGetMyAssignedTodo, modifyMyTodoStatus} = useTodo();
  const {data: todo} = useGetMyAssignedTodo(67, 48);

  const handleChangeStatus = () => {
    modifyMyTodoStatus.mutate(
      {
        moimId: 67,
        todoId: 48,
        todoAssigneeStatus: TODO_ASSIGNEE_STATUS.COMPLETE,
      },
      {
        onSuccess: data => console.log(data),
      },
    );
  };

  let buttonLabel = '';

  switch (todo?.todoAssigneeStatus) {
    case 'COMPLETE':
      buttonLabel = '완료';
      break;
    case 'LOADING':
      buttonLabel = '진행 중';
      break;
    case 'OVERDUE':
      buttonLabel = '마감';
      break;
    case 'PENDING':
      buttonLabel = '시작 전';
      break;
    default:
      return;
  }

  return (
    <ScreenContainer>
      <Label label={buttonLabel} variant={'filled'} />
      <DetailItem
        iconName="calendar"
        title="마감일"
        content={moment(todo?.dueDate).format('YYYY년 M월 D일')}
      />
      <FastImage
        source={{uri: todo?.imageUrlList[0]}}
        className="h-[300] rounded-2xl w-full"
        resizeMode={FastImage.resizeMode.cover}
      />
      <DetailItem iconName="pencil" title="내가 할 일" content={todo?.title} />
      <DetailItem
        isMemo={true}
        iconName="note"
        title="상세 내용"
        content={todo?.content}
      />
      <CustomButton label={buttonLabel} onPress={handleChangeStatus} />
    </ScreenContainer>
  );
}
