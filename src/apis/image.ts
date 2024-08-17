import axiosInstance from './axiosInstance.ts';
import axios from 'axios';
import {
  TPresignedImageResponse,
  TPresignedImagesResponse,
} from 'types/dtos/image.ts';

const uploadImages = async ({
  url,
  file,
}: {
  url: string;
  file: FormData;
}): Promise<string[]> => {
  const {data} = await axios.put(url, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

const createPresignedURL = async (
  fileName: string,
): Promise<TPresignedImageResponse> => {
  const {data} = await axiosInstance.post(`/api/v0/s3/presigned/upload`, {
    fileName,
  });

  return data.result;
};

const createMultiplePresingedURL = async (
  fileName: string[],
): Promise<TPresignedImagesResponse> => {
  const {data} = await axiosInstance.post(`/api/v0/s3/presigned/upload/list`, {
    fileName,
  });

  return data.result;
};

export {uploadImages, createPresignedURL, createMultiplePresingedURL};
