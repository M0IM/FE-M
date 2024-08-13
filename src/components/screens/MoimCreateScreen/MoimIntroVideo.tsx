import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Typography } from 'components/@common/Typography/Typography';
import { InputField } from 'components/@common/InputField/InputField';

const MoimIntroVideo = () => {
  return (
    <View className='flex flex-col'>
        <Typography fontWeight={'MEDIUM'} className='text-sm text-gray-500 mb-2'>
        모임 소개 영상 게시
        </Typography>
        <Typography fontWeight={'MEDIUM'} className='text-xs text-gray-300 mb-2'>
        *모임을 소개하는 영상을 업로드해서 모임의 특별한 활동을 홍보하세요.{'\n'}
        최대 60초 길이의 영상을 업로드할 수 있습니다.{'\n'}
        영상은 모임에 가입하지 않은 유저에게도 노출될 수 있습니다.{'\n'}
        </Typography>
        <View className='max-h-[800px]'>
        <InputField touched placeholder='제목을 입력하세요.' />
        </View>
        <View className='flex flex-row mt-3'>
        <View className='flex flex-col items-center justify-center h-[200] w-[150] bg-gray-100 rounded-lg '>
            <Typography fontWeight='MEDIUM' className='text-gray-300'>영상을 게시하면</Typography>
            <Typography fontWeight='MEDIUM' className='text-gray-300'>썸네일이 표시됩니다.</Typography>
        </View>
        <TouchableOpacity activeOpacity={0.8} className='flex flex-row gap-x-3 p-3'>
            <Typography fontWeight='MEDIUM' className='text-gray-300 mt-1'>영상 게시하기</Typography>
            <Ionicons name='camera' color={"#9EA4AA"} size={20} />
        </TouchableOpacity>
        </View>
        <Typography fontWeight={'MEDIUM'} className='text-xs text-gray-300 mb-2 mt-3'>
        [ 모임 소개 영상 업로드 기능 이용 안내 ]{'\n'}
        모임 소개에 맞지 않는 영상, 커뮤니티 이용자에게 불쾌감을 줄 수 있는 내용, 차별 및 혐오표현, 유해 정보, 음란물, 불법 컨텐츠, 개인정보, 욕설, 명예쉐손 등이 포함된 영상은 신고 대상입니다.{'\n'}
        해당 영상이 5번 이상 신고 되면 더 이상 서비스에 노출되지 않거나, 관리자 판단 하에 삭제 대상이 될 수 있습니다.{'\n'}
        </Typography>
    </View>
  );
};

export default MoimIntroVideo;