import {
  View,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import {Typography} from 'components/@common/Typography/Typography';

// TEST DATA
const postList = [
  {
    spaceName: '우리 동네 배드민턴',
    contentsList: [
      {
        title: '매주 월요일 정기 스터디이니까 오세요.',
        category: '공지',
      },
      {
        title: '매주 월요일 정기 스터디이니까 오세요.',
        category: '공지',
      },
      {
        title:
          '안녕하세요. 이번에 가입한 OO입니다. 잘부탁드립니다. 제 능력을 보여드리겠습니다.',
        category: '가입인사',
      },
    ],
  },
  {
    spaceName: 'UMC 개발 동아리',
    contentsList: [
      {
        title: '매주 월요일 정기 스터디이니까 오세요.',
        category: '공지',
      },
      {
        title: '매주 월요일 정기 스터디이니까 오세요.',
        category: '공지',
      },
      {
        title:
          '안녕하세요. 이번에 가입한 OO입니다. 잘부탁드립니다. 제 능력을 보여드리겠습니다.',
        category: '가입인사',
      },
    ],
  },
];

interface PostPreviewBoxProps extends TouchableOpacityProps {
  // TODO: Post Type 필요
  postList?: any;
}

const PostPreviewBox = ({
  //   postList,
  ...props
}: PostPreviewBoxProps) => {
  return (
    <View className="flex flex-col px-7 py-2 rounded-3xl bg-gray-50 border-gray-100 border-[1px]">
      {postList.map((item, index) => (
        <View key={index} className="flex flex-col py-4">
          <Typography className="text-base" fontWeight="MEDIUM">
            {item.spaceName}
          </Typography>
          {item.contentsList.map((item, index) => (
            <TouchableOpacity
              {...props}
              activeOpacity={0.8}
              key={index}
              className="flex flex-row items-center justify-between">
              <Typography
                fontWeight="MEDIUM"
                numberOfLines={1}
                className="text-xs w-[250] mt-2 text-gray-400">
                {item.title}
              </Typography>
              <Typography fontWeight="BOLD" className="text-main text-xs">
                {item.category}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default PostPreviewBox;
