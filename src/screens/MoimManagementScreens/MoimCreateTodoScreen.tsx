import {
  Image,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {MoimManagementRouteProp} from '../../navigators/types';
import useForm from '../../hooks/useForm.ts';
import {getDateWithSeparator, validateTodo} from '../../utils';
import {ScreenContainer} from '../../components/ScreenContainer.tsx';
import {CustomButton} from '../../components/@common/CustomButton/CustomButton.tsx';
import {InputField} from '../../components/@common/InputField/InputField.tsx';
import React, {useState} from 'react';
import useModal from '../../hooks/useModal.ts';
import {DatePickerOption} from '../../components/@common/DatePickerOption/DatePickerOption.tsx';
import usePermission from '../../hooks/usePermission.ts';
import useSingleImagePicker from '../../hooks/useSingleImagePicker.ts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReadersBottomSheet from '../../components/screens/MoimBoardStackScreens/ReadersBottomSheet.tsx';
import ReaderPickerBottomSheet from './components/ReaderPickerBottomSheet.tsx';

export default function MoimCreateTodoScreen({
  route,
}: {
  route: MoimManagementRouteProp;
}) {
  usePermission('PHOTO');

  const moimId = route.params.id as number;
  const datePickerModal = useModal();
  const memberSelectModal = useModal();
  const [date, setDate] = useState(new Date());
  const [pickedDate, setPickedDate] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const {imageUri, uploadUri, handleChange, deleteImageUri} =
    useSingleImagePicker({});
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleToggleSelectedIds = (id: number) => {
    setSelectedIds(prev =>
      // 필터
      // 현재 클릭한 아이디를 포함하고 있으면, 필터 제거
      // 아니면 추가
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
      title: '',
      content: '',
    },
    validate: validateTodo,
  });

  const handleSubmit = () => {
    console.log({
      moimId,
      title: addTodo.values.title,
      content: addTodo.values.content,
      dueDate: date,
      imageKeyList: [uploadUri],
      targetUserIdList: selectAll ? [] : selectedIds,
      isAssignedSelectAll: selectAll,
    });
  };

  return (
    <ScreenContainer
      fixedBottomComponent={
        <CustomButton
          textStyle="text-white text-lg font-bold"
          label="할 일 배정"
          onPress={handleSubmit}
        />
      }>
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
            pickedDate ? `${getDateWithSeparator(date, '. ')}` : '마감 기한'
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
                source={{uri: imageUri}}
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
