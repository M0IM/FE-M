import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PopoverMenu from 'components/@common/Popover/PopoverMenu/PopoverMenu';
import { ScreenContainer } from 'components/ScreenContainer';
import usePopover from 'hooks/usePopover';
import { InputField } from 'components/@common/InputField/InputField';
import PostUserProfile from 'components/screens/MoimBoardStackScreens/postDetail/PostUserProfile';
import PostInfoContainer from 'components/screens/MoimBoardStackScreens/postDetail/PostInfoContainer';
import PostCommentContainer from 'components/screens/MoimBoardStackScreens/postDetail/PostCommentContainer';
import { MoimPostStackRouteProp } from 'navigators/types';

const testImages = [
     "https://images.unsplash.com/photo-1704304660865-4c2ba1514289?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
     "https://images.unsplash.com/photo-1722941600508-1c89628da11f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D",
     "https://images.unsplash.com/photo-1722525900762-a1969eb9372a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1NHx8fGVufDB8fHx8fA%3D%3D"
];

interface MoimPostDetailScreenProps {
    route: MoimPostStackRouteProp;
}

const MoimPostDetailScreen = ({route}: MoimPostDetailScreenProps) => {
    console.log(route.params?.id);
    const { isPopover, handlePopover } = usePopover();
    const PostMenuList = [
        {
            title: '신고하기',
            onPress: () => {}            
        },
        {
            title: '채팅하기',
            onPress: () => {}            
        },
        {
            title: '차단하기',
            onPress: () => {}            
        }
    ];

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 70}
            behavior="padding"
            className='flex-1'
        >
            <ScreenContainer>
                {/* 게시글 작성자 프로필 & 메뉴 버튼 */}
                <PostUserProfile handlePopover={handlePopover} />
                {/* 게시글 본문 */}
                <PostInfoContainer postImages={testImages} />
                {/* 댓글 리스트 */}
                {Array(10).fill(null).map((item, index) => (
                    <PostCommentContainer key={index} />
                ))}
                {/* 게시글 메뉴 */}
                <View className='absolute top-14 right-6'>
                    <PopoverMenu menu={PostMenuList} isPopover={isPopover} />
                </View>
            </ScreenContainer>

            {/* 댓글 작성 인풋 */}
            <View className='items-center justify-between flex-row p-3'>
                <View className='w-[90%]'>
                    <InputField className='flex-3' placeholder='댓글을 입력해주세요.' touched />
                </View>
                <TouchableOpacity className='m-3'>
                    <Ionicons name="send" size={25} color={'#00F0A1'} style={{ transform: [{ rotate: '-45deg' }] }} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default MoimPostDetailScreen;