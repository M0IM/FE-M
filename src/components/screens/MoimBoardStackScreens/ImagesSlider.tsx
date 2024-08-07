import { View, Image } from 'react-native';
import Swiper, { SwiperProps } from 'react-native-swiper';

// TODO: 타입 변경 필요
interface ImagesSliderProps extends SwiperProps {
    height: number;
    images: string[];
    className?: string;
}

const ImagesSlider = ({
    height, 
    images,
    className,
    ...props
}: ImagesSliderProps) => {
  return (
    <Swiper 
        {...props} 
        className={`mt-10 h-[${height}] ${className}`} 
        showsButtons={false} 
        dotColor='#F8F8F9' 
        activeDotColor="#00F0A1"
    >
        {images.map((item, index) => (
            <View key={index} className='justify-center items-center'>
                <Image source={{uri: item}} className={`w-full h-[${height}] rounded-lg`} />
            </View>
        ))}
    </Swiper>
  );
};

export default ImagesSlider;