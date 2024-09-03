import {Image, Pressable, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Config from 'react-native-config';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {InputField} from 'components/@common/InputField/InputField.tsx';
import {DatePickerOption} from 'components/@common/DatePickerOption/DatePickerOption.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import ReaderPickerBottomSheet from './components/ReaderPickerBottomSheet.tsx';

import {
  MoimManagementNavigationProp,
  MoimManagementRouteProp,
} from 'navigators/types';
import {getDateWithSeparator, validateTodo} from 'utils';
import useForm from 'hooks/useForm.ts';
import useModal from 'hooks/useModal.ts';
import usePermission from 'hooks/usePermission.ts';
import useSingleImagePicker from 'hooks/useSingleImagePicker.ts';
import useTodo from 'hooks/useTodo.ts';
import useTodoStore from 'stores/useTodoStore.ts';

export default function MoimCreateTodoScreen({
  route,
  navigation,
}: {
  route: MoimManagementRouteProp;
  navigation: MoimManagementNavigationProp;
}) {
  usePermission('PHOTO');
  const {todoList, isEditMode, setIsEditMode} = useTodoStore();
  const isEdit = todoList && isEditMode;

  const moimId = route.params.id as number;
  const datePickerModal = useModal();
  const memberSelectModal = useModal();
  const [date, setDate] = useState(
    isEdit ? new Date(todoList?.dueDate) : new Date(),
  );
  const [pickedDate, setPickedDate] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const {imageUri, uploadUri, handleChange, deleteImageUri} =
    useSingleImagePicker(
      isEdit ? {initialImage: todoList?.imageUrlList[0]} : {},
    );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const {createTodoMutation, modifyTodoMutation} = useTodo();

  const handleToggleSelectedIds = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id],
    );
  };

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleConfirmDate = () => {
    setPickedDate(true);
    datePickerModal.hide();
  };

  const addTodo = useForm({
    initialValue: {
      title: isEdit ? todoList.title : '',
      content: isEdit ? todoList?.content : '',
    },
    validate: validateTodo,
  });

  const handleCreateTodo = () => {
    createTodoMutation.mutate(
      {
        moimId,
        title: addTodo.values.title,
        content: addTodo.values.content,
        dueDate: moment(date).format('YYYY-MM-DD'),
        imageKeyList: [uploadUri],
        targetUserIdList: selectAll ? [] : selectedIds,
        isAssigneeSelectAll: selectAll,
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      },
    );
  };

  const handleModifyTodo = () => {
    const imageKey = uploadUri
      ? // uploadUri가 존재하면 사용.
        uploadUri
      : // uploadUri가 없는 경우 imageUri 사용.
        // imageUri가 도메인을 포함하면
        imageUri.includes(Config.AWS_S3_URL)
        ? // imageUri 도메인 제거
          imageUri.replace(Config.AWS_S3_URL, '')
        : // imageUri 제거
          imageUri;
    isEdit &&
      modifyTodoMutation.mutate(
        {
          moimId,
          todoId: todoList?.todoId as number,
          title: addTodo.values.title,
          content: addTodo.values.content,
          dueDate: moment(date).format('YYYY-MM-DD'),
          imageKeyList: [imageKey],
          targetUserIdList: selectAll ? [] : selectedIds,
          isAssigneeSelectAll: selectAll,
        },
        {
          onSuccess: data => {
            setIsEditMode(false);
            console.log(data);
            navigation.goBack();
          },
        },
      );
  };

  return (
    <ScreenContainer>
      <View className="mt-4">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          제목
        </Typography>
        <InputField
          autoFocus
          {...addTodo.getTextInputProps('title')}
          error={addTodo.errors.title}
          touched={addTodo.touched.title}
          placeholder="제목을 입력하세요."
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => {}}
        />
      </View>
      <View className="mt-4">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          내용
        </Typography>
        <InputField
          multiline
          {...addTodo.getTextInputProps('content')}
          error={addTodo.errors.content}
          touched={addTodo.touched.content}
          placeholder="내용 입력하세요."
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => {}}
        />
      </View>
      <View className="mt-2">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          마감 기한
        </Typography>
        <CustomButton
          variant="gray"
          label={
            pickedDate || isEdit
              ? `${getDateWithSeparator(date, '. ')}`
              : '마감 기한'
          }
          onPress={datePickerModal.show}
        />
      </View>
      <View className="flex flex-col">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          참고 이미지
        </Typography>
        <View className="flex flex-row items-center gap-x-6">
          <TouchableOpacity activeOpacity={0.8} onPress={handleChange}>
            <Ionicons
              name="camera"
              size={40}
              color={'#9EA4AA'}
              style={{padding: 10}}
            />
          </TouchableOpacity>
          {imageUri && (
            <View className="w-[80] h-[100]">
              <Image
                source={{
                  uri: imageUri,
                }}
                className="w-full h-full rounded-2xl"
              />
              <Pressable
                onPress={() => deleteImageUri()}
                className="flex flex-col items-center justify-center absolute bottom-0 w-[80] bg-white h-2/5 rounded-b-2xl border-[1px] border-gray-200">
                <Ionicons name="trash" size={15} color={'#9EA4AA'} />
              </Pressable>
            </View>
          )}
        </View>
      </View>

      <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
        멤버 선택
      </Typography>
      <View className="flex-row gap-x-3">
        <TouchableOpacity onPress={() => setSelectAll(prev => !prev)}>
          <View className="flex-row items-center w-full">
            <View className="flex flex-col items-center justify-center border-gray-400 border-[1px] p-[5] rounded-full w-[15] h-[15] mr-2">
              <View
                className={`${
                  selectAll ? 'bg-main' : ''
                } rounded-full w-[10] h-[10]`}
              />
            </View>
            <Typography className="text-gray-500" fontWeight={'BOLD'}>
              전체
            </Typography>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectAll(prev => !prev)}>
          <View className="flex-row items-center w-full">
            <View className="flex flex-col items-center justify-center border-gray-400 border-[1px] p-[5] rounded-full w-[15] h-[15] mr-2">
              <View
                className={`${
                  selectAll ? '' : 'bg-main'
                } rounded-full w-[10] h-[10]`}
              />
            </View>
            <Typography className="text-gray-500" fontWeight={'BOLD'}>
              개인
            </Typography>
          </View>
        </TouchableOpacity>
      </View>

      {!selectAll && (
        <TouchableOpacity className="mt-4">
          <TouchableOpacity
            onPress={memberSelectModal.show}
            activeOpacity={0.8}
            className="flex flex-row border-0.5 border-gray-100 rounded-xl bg-gray-100 p-4">
            <Typography fontWeight="MEDIUM" className="text-sm text-gray-400">
              {selectedIds.length > 0
                ? `${selectedIds.length}명`
                : '멤버 개별 선택'}
            </Typography>
            <Ionicons
              name="chevron-up-outline"
              color={'#535353'}
              size={15}
              style={{marginLeft: 'auto'}}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      <CustomButton
        className={`${createTodoMutation.isPending ? 'bg-gray-300' : ''}`}
        textStyle="text-white text-lg font-bold"
        label={`${createTodoMutation.isPending ? '배정 중...' : '할 일 배정'}`}
        onPress={isEdit ? handleModifyTodo : handleCreateTodo}
        disabled={createTodoMutation.isPending}
      />
      <DatePickerOption
        isVisible={datePickerModal.isVisible}
        onOpen={datePickerModal.show}
        onClose={datePickerModal.hide}
        date={date}
        onChangeDate={handleChangeDate}
        onConfirmDate={handleConfirmDate}
      />
      <ReaderPickerBottomSheet
        moimId={moimId}
        isOpen={memberSelectModal.isVisible}
        onOpen={memberSelectModal.show}
        onClose={memberSelectModal.hide}
        handleToggleSelect={handleToggleSelectedIds}
        setSelectedIds={setSelectedIds}
        selectedIds={selectedIds}
      />
    </ScreenContainer>
  );
}
