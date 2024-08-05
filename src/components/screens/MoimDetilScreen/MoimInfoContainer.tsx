import Label from 'components/@common/Label/Label';
import { Typography } from 'components/@common/Typography/Typography';
import { Image, View } from 'react-native';

const images = [
    {
        profileImg: "https://images.unsplash.com/photo-1722495102451-b570ef9cfd15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        profileImg: "https://images.unsplash.com/photo-1722495102451-b570ef9cfd15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        profileImg: "https://images.unsplash.com/photo-1722495102451-b570ef9cfd15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D"
    }
];

const MoimInfoContainer = () => {
  return (
    <View className='mt-16 flex flex-col'>
        <View className='flex flex-row items-center px-6 h-[30px]'>
            <Label label='# 개발' color='main' style='ml-1'/>
            <Label label='# 교육' color='main' style='ml-1' />
            <Label label='# IT' color='main' style='ml-1' />
            <View className='flex flex-row items-center ml-auto'>
                <View className='flex flex-row items-center ml-auto'>
                    {images.map((item, index) => (
                        <View key={index} style={{ marginLeft: -7 * index }}>
                            <Image
                                source={{ uri: item.profileImg }} 
                                style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 15,
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    zIndex: images.length + index,
                                }} 
                            />
                        </View>
                    ))}
                </View>
                <Typography fontWeight='MEDIUM' className='ml-2'>...</Typography>
            </View>
        </View>
        <Typography fontWeight='BOLD' className='text-xl text-dark-800 px-6 mt-3'>우리 동네 배드민턴</Typography>
        <Typography fontWeight='LIGHT' className='text-sm text-gray-600 px-6 mt-2'>안녕하세요 상명대학교 UMC 워크스페이스에 오신 것을 환영합니다.
        우리 동아리는 정말 짱짱맨입니다.
        왜냐하면, 완전 대박인 워크북이 있기 때문입니다. 관심있으면 아래 이메일로 연락주세요.
        1904vv@gmail.com </Typography>
    </View>
  );
};

export default MoimInfoContainer;