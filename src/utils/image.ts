import {Image} from 'react-native-image-crop-picker';

/**
 * @param {Image[]} images - 2개 이상 이미지를 배열로 인수로 받습니다.
 * @return formData - 이미지들을(uri, type, name) formData에 담아 formData를 반환합니다.
 * */
function getFormDataImages(images: Image[]) {
  const formData = new FormData();

  images.forEach(({path, mime}) => {
    const file = {
      uri: path,
      type: mime,
      name: path.split('/').pop(),
    };

    formData.append('filename', file);
  });

  return formData;
}

/**
 * @param {Image[]} image - 단일 이미지.
 * @return formData - 이미지를(uri, type, name) formData에 담아 formData를 반환합니다.
 * */
function getFormDataImage(image: Image) {
  const formData = new FormData();
  const file = {
    uri: image.path,
    type: image.mime,
    name: image.path.split('/').pop(),
  };
  formData.append('file', file);
  const fileName = file.name as string;

  return {formData, fileName};
}

export {getFormDataImages, getFormDataImage};
