import ImagePicker from 'react-native-image-crop-picker';
import {getFormDataImage} from 'utils';
import useMutateImages from './queries/MoimCreateScreen/useMutateImages.ts';
import {useState} from 'react';
import useCreatePresignedURL from './queries/MyScreen/useCreatePresignedURL.ts';
import Config from 'react-native-config';

interface UseSingleImagePickerProps {
  initialImage?: string;
}
function useSingleImagePicker({initialImage = ''}: UseSingleImagePickerProps) {
  const [imageUri, setImageUri] = useState(initialImage);
  const [uploadUri, setUploadUri] = useState('');
  const uploadImages = useMutateImages();
  const {mutate: createPresignedUrl} = useCreatePresignedURL();

  const addImagesUris = (uri: string) => {
    setImageUri(uri);
  };

  const addUploadUris = (uri: string) => {
    setUploadUri(uri);
  };

  const deleteImageUri = () => {
    setImageUri('');
    setUploadUri('');
  };

  const handleChange = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: false,
        includeBase64: true,
        maxFiles: 1,
        cropperChooseText: '완료',
        cropperCancelText: '취소',
      });
      const {formData, fileName, fileType, fileUri} = getFormDataImage(image);
      createPresignedUrl(fileName, {
        onSuccess: data => {
          const {url, keyName} = data;
          uploadImages.mutate(
            {url, file: formData, fileType, fileUri},
            {
              onSuccess: () => {
                addUploadUris(keyName);
                addImagesUris(`${Config.AWS_S3_URL}${keyName}`);
              },
            },
          );
        },
        onError: error => {
          console.log('Error creating presigned URL:', error);
        },
      });
    } catch (error: any) {
      if (error?.code !== 'E_PICKER_CANCELLED') {
        console.log('Error picking images: ', error);
      }
    }
  };

  return {
    imageUri,
    uploadUri,
    handleChange,
    deleteImageUri,
  };
}

export default useSingleImagePicker;
