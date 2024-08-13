import axiosInstance from './axiosInstance.ts';

const uploadImages = async (body: FormData): Promise<string[]> => {
  const {data} = await axiosInstance.post('/images', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export {uploadImages};
