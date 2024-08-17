type TPresignedImageResponse = {
  url: string;
  keyName: string;
};

type TPresignedImagesResponse = {
  url: string;
  keyName: string[];
};

export type {TPresignedImageResponse, TPresignedImagesResponse};
