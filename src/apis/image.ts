import axiosInstance from './axiosInstance.ts';
import axios from 'axios';
import {
  TPresignedImageResponse,
  TPresignedImagesResponse,
} from 'types/dtos/image.ts';

const uploadImages = async ({
  url,
  file,
  fileType,
  fileUri,
}: {
  url: string;
  file: FormData;
  fileType: string;
  fileUri: string;
}): Promise<any> => {
  const imageFile = await fetch(fileUri);
  const imageBlob = await imageFile.blob();

  await fetch(url, {
    method: 'PUT',
    headers: {'Content-Type': fileType},
    body: imageBlob,
  });
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
