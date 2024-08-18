import {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {InputField} from 'components/@common/InputField/InputField';
import Label from 'components/@common/Label/Label';
import {Typography} from 'components/@common/Typography/Typography';
import {ActiveMoimCard} from 'components/calendar/ActiveMoimCard';
import {ScreenContainer} from 'components/ScreenContainer';
import {CATEGORY_LIST} from 'constants/screens/MoimSearchScreen/CategoryList';
import useDebounce from '../../hooks/useDebounce.ts';

const ActiveMoimData = [
  {
    id: 1,
    title: '우리 동네 배드민턴',
    subTitle: '배드민턴도 열심히 해서 대회도 나가 강사 활동도 해봐요',
    category: '외국/언어',
    region: '서울',
    memberCount: 3,
  },
  {
    id: 2,
    title: '서울 영어 회화',
    subTitle: '영어 실력을 키워보아요',
    category: '외국/언어',
    region: '서울',
    memberCount: 10,
  },
];

const MoimSearchScreen = () => {
  const [value, setValue] = useState('');
  const [select, setSelect] = useState('');
  const debouncedValue = useDebounce(value, 300);

  const handleSelect = (selectItem: string) => {
    setSelect(selectItem);
  };

  const handleSearch = () => {
    if (debouncedValue) {
      console.log(debouncedValue);
    }
  };

  return (
    <ScreenContainer>
      <View className="flex flex-row items-center gap-x-2 mt-5">
        <View className="flex-1">
          <InputField
            className="flex-1"
            icon={
              <TouchableOpacity onPress={handleSearch} disabled={!value}>
                <Ionicons
                  name="search"
                  size={30}
                  color={value ? '#1D2002' : '#E9ECEF'}
                />
              </TouchableOpacity>
            }
            touched
            placeholder="검색어 입력"
            value={value}
            onChangeText={value => setValue(value)}
          />
        </View>
      </View>
      <View className="flex flex-col gap-y-10">
        <FlatList
          horizontal
          data={CATEGORY_LIST}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Label
                label={item}
                color={select === item ? 'main' : 'gray'}
                variant={select === item ? 'filled' : 'outlined'}
              />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View className="w-1" />}
        />
        <View className="flex flex-col">
          <View className="flex flex-row items-center gap-x-2">
            <Typography fontWeight="BOLD" className="text-dark-800 text-base">
              {debouncedValue} 검색 결과
            </Typography>
            <Typography fontWeight="MEDIUM" className="text-gray-400 text-xs">
              (3)
            </Typography>
          </View>
        </View>
      </View>
      <View>
        {ActiveMoimData.map(
          ({id, title, subTitle, category, region, memberCount}) => {
            return (
              <ActiveMoimCard
                key={id}
                id={String(id)}
                title={title}
                subTitle={subTitle}
                category={category}
                region={region}
                memberCount={memberCount}
              />
            );
          },
        )}
      </View>
    </ScreenContainer>
  );
};

export default MoimSearchScreen;
