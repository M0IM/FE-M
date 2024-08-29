import ImagePicker from 'react-native-image-crop-picker';
import {getFormDataImage, getFormDataImages} from 'utils';
import useMutateImages from './queries/MoimCreateScreen/useMutateImages.ts';
import {useState} from 'react';
import {Alert} from 'react-native';
import useCreatePresignedURL from './queries/MyScreen/useCreatePresignedURL.ts';
import Config from 'react-native-config';

interface UseImagePickerProps {
  initialImages: string[];
}

// TODO: 수정 필요
function useImagePicker({initialImages = []}: UseImagePickerProps) {
  const [imageUris, setImageUris] = useState(initialImages);
  const [uploadUris, setUploadUris] = useState<string[]>([]);
  const uploadImages = useMutateImages();
  const {mutate: createPresignedUrl} = useCreatePresignedURL();

  const addImagesUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 10) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지 최대 10개 입니다.');
      return;
    }
    setImageUris(prev => [...prev, ...uris]);
  };

  const addUploadUris = (uploadUris: string[]) => {
    setUploadUris(prev => [...prev, ...uploadUris]);
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
  const uris: any = [];
  const uploadUrisList: any = [];

  const handleChange = async () => {
    try {
      const images = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: true,
        includeBase64: true,
        maxFiles: 10,
        cropperChooseText: '완료',
        cropperCancelText: '취소',
      });

      images.map(async item => {
        try {
          const {formData, fileName, fileType, fileUri} =
            getFormDataImage(item);
          console.log('fileName', fileName);
          createPresignedUrl(fileName, {
            onSuccess: data => {
              const {url, keyName} = data;
              uploadImages.mutate(
                {url, file: formData, fileType, fileUri},
                {
                  onSuccess: () => {
                    uploadUrisList.push(keyName);
                    uris.push(`${Config.AWS_S3_URL}${keyName}`);
                    addUploadUris(uploadUris);
                    addImagesUris(uris);
                  },
                },
              );
            },
            onError: error => {
              console.log('Error creating presigned URL:', error);
            },
          });
        } catch (error) {
          console.error(error);
        }
      });
    } catch (error: any) {
      if (error?.code !== 'E_PICKER_CANCELLED') {
        console.log('Error picking images: ', error);
      }
    }
  };

  return {
    imageUris,
    uploadUris,
    handleChange,
    delete: deleteImageUris,
    changeOrder: changeImageUriOrder,
  };
}

export default useImagePicker;
