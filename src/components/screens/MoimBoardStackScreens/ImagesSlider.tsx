import {Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper, {SwiperProps} from 'react-native-swiper';

// TODO: 타입 변경 필요
interface ImagesSliderProps extends SwiperProps {
  height: number;
  images?: string[];
  className?: string;
}

const ImagesSlider = ({
  height,
  images,
  className,
  ...props
}: ImagesSliderProps) => {
  console.log(images);
  return (
    <>
      <Swiper
        {...props}
        className={`mt-10 ${className}`}
        height={height + 50}
        showsButtons={false}
        dotColor="#F8F8F9"
        activeDotColor="#00F0A1">
        {images?.map((item, index) => (
          <View key={index} className="justify-center items-center">
            <Image
              source={{
                uri: item,
              }}
              className={`w-full rounded-lg`}
              resizeMode={FastImage.resizeMode.contain}
              style={{height: height}}
            />
          </View>
        ))}
      </Swiper>
    </>
  );
};

export default ImagesSlider;
