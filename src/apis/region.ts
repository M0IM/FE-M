import axiosInstance from './axiosInstance.ts';
import {RegionSearchResponse} from '../types/dtos/region.ts';

const getSearchRegion = async ({
  searchTerm,
  cursor = 1,
  take,
}: {
  searchTerm: string;
  cursor: number;
  take: number;
}): Promise<RegionSearchResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/regions/search?searchTerm=${searchTerm}&cursor=${cursor}&take=${take}`,
  );

  return data.result;
};

export {getSearchRegion};
