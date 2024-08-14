import axiosInstance from './axiosInstance.ts';

const uploadImages = async (body: FormData): Promise<string[]> => {
  const {data} = await axiosInstance.put('/images', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log(data, 'hi');

  return data;
};

const createPresignedURL = async (filename: string) => {
  const {data} = await axiosInstance.get(
    `/api/v0/s3/presigned/upload?filename=${filename}`,
  );
  return data;
};

export {uploadImages, createPresignedURL};
