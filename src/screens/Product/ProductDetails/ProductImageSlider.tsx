import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import {API_URL} from '../../../api/constants';

interface ProductImageSliderProps {
  images: Array<{url: string}>;
  onSaveImage?: (url: string) => void;
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({
  images,
  onSaveImage,
}) => {
  const API_BASE_URL_UPLOAD = API_URL;

  return (
    <Swiper
      style={{height: 300}}
      showsPagination
      loop
      autoplay
      dotStyle={{backgroundColor: '#ccc'}}
      activeDotStyle={{backgroundColor: '#000'}}>
      {images.map((image, index) => (
        <TouchableOpacity
          key={index}
          onLongPress={() =>
            onSaveImage && onSaveImage(`${API_BASE_URL_UPLOAD}${image.url}`)
          }
          activeOpacity={0.9}>
          <Image
            source={{uri: `${API_BASE_URL_UPLOAD}${image.url}`}}
            style={{width: '100%', height: 300}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
    </Swiper>
  );
};

export default ProductImageSlider;
