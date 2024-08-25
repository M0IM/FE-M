import {useNavigation} from '@react-navigation/native';
import {Typography} from 'components/@common/Typography/Typography';
import {POST_TYPES} from 'constants/screens/MoimBoardStackScreens/PostList';
import {HomeStackNavigationProp} from 'navigators/types';
import {TouchableOpacity} from 'react-native';
import {TMoimPostPreviewDTOList} from 'types/dtos/moim';

interface AllMoimPostProps {
  postList?: TMoimPostPreviewDTOList[];
  moimId: number;
}

const AllMoimPost = ({postList, moimId}: AllMoimPostProps) => {
  const getLabelForPostType = (key: string) => {
    const postType = POST_TYPES.find(type => type.key === key);
    return postType ? postType.label : '';
  };
  const navigation = useNavigation<HomeStackNavigationProp>();

  console.log(moimId);

  return (
    <>
      {postList?.map(postItem => (
        <TouchableOpacity
          key={postItem.moimPostId}
          activeOpacity={0.8}
          className="flex flex-row items-center justify-between"
          onPress={() => {
            navigation.navigate('MOIM_STACK', {
              screen: 'MOIM_TOP_BOARD',
              params: {
                id: moimId,
              },
            });
          }}>
          <Typography
            fontWeight="MEDIUM"
            numberOfLines={1}
            className="text-xs w-[250] mt-2 text-gray-400">
            {postItem.title}
          </Typography>
          <Typography fontWeight="BOLD" className="text-main text-xs">
            {getLabelForPostType(postItem.postType)}
          </Typography>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default AllMoimPost;
