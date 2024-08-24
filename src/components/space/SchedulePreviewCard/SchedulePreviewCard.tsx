import {Typography} from 'components/@common/Typography/Typography';
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  //   Image,
} from 'react-native';
import {formatKoreanDate} from 'utils';

type ParticipantsType = {
  userId: number;
  email: string;
  nickname: string;
  profileImg: string;
};

interface SchedulePreviewCardProps extends TouchableOpacityProps {
  title: string;
  date: string;
  place: string;
  cost?: number;
  participants?: ParticipantsType[];
}

const SchedulePreviewCard = ({
  title,
  date,
  place,
  //   cost,
  //   participants = [],
  ...props
}: SchedulePreviewCardProps) => {
  //   const participantsCount =
  //     participants.length > 3 ? participants.slice(0, 3) : participants;

  return (
    <TouchableOpacity
      {...props}
      className="flex flex-col p-6 w-[280px] bg-gray-50 border-gray-200 border-[0.5px] rounded-2xl">
      <Typography fontWeight="BOLD" className="text-base" numberOfLines={1}>
        {title}
      </Typography>
      <View className="flex flex-row items-center mt-2">
        <View className="w-[7px] h-[7px] bg-main rounded-full mr-2" />
        <Typography fontWeight="MEDIUM" className="text-gray-300 text-sm">
          {formatKoreanDate(new Date(date))}
        </Typography>
      </View>
      <Typography
        fontWeight="MEDIUM"
        className="text-gray-300 text-sm"
        numberOfLines={1}>
        {place}
      </Typography>
      {/* <Typography fontWeight='MEDIUM' className='text-gray-300 text-sm'>{cost} 원</Typography> */}
      {/* <View className="flex flex-row items-center mt-2 ml-auto">
        {participantsCount.map((item, index) => (
          <View key={index} style={{marginLeft: -7 * index}}>
            <Image
              source={{uri: item.profileImg}}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'white',
                zIndex: participants.length + index,
              }}
            />
          </View>
        ))}
        <Typography fontWeight='MEDIUM' className='text-xs ml-2'>{participants.length}명</Typography>
      </View> */}
    </TouchableOpacity>
  );
};

export default SchedulePreviewCard;
