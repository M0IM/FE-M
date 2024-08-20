import ImagePicker from 'react-native-image-crop-picker';
import {getFormDataImages} from 'utils';
import useMutateImages from './queries/MoimCreateScreen/useMutateImages.ts';
import {useState} from 'react';
import {ImageUri} from '../types/domain.ts';
import {Alert} from 'react-native';
import useCreatePresignedURL from './queries/MyScreen/useCreatePresignedURL.ts';

interface UseImagePickerProps {
  initialImages: string[];
}

function useImagePicker({initialImages = []}: UseImagePickerProps) {
  const [imageUris, setImageUris] = useState(initialImages);
  const uploadImages = useMutateImages();
  const {mutate: createPresignedUrl} = useCreatePresignedURL();

  const addImagesUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 10) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지 최대 10개 입니다.');
      return;
    }
    setImageUris(prev => [...prev]);
  };

  const deleteImageUris = (uri: string) => {
    const newImageUris = imageUris.filter(image => image !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUriOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUris = [...imageUris];
    const [removedImage] = copyImageUris.splice(fromIndex, 1);
    copyImageUris.splice(toIndex, 0, removedImage);
    setImageUris(copyImageUris);
  };

  const handleChange = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 10,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages(images);
        // TODO: GET: /api/v0/s3/presigned/upload로 요청을 보내, url, keyname을 받는다.
        // TODO: GET: /api/v0/s3/presigned/download로 요청을 보내(위에서 받은 url을 보냄) 그래서 url을받는다.
        // console.log(formData, '야호');
        console.log(formData);
        uploadImages.mutate(
          {url: formData.result.url, file: formData},
          {
            // 업로드 성공시 데이터를 옆에 보이게 해줌.
            onSuccess: data => {
              addImagesUris(data);
              console.log(data, '야호');
            },
          },
        );
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          // 에러메시지 표현
        }
      });
  };

  return {
    imageUris,
    handleChange,
    delete: deleteImageUris,
    changeOrder: changeImageUriOrder,
  };
}

export default useImagePicker;
