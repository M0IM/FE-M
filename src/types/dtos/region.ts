type RegionSearchDTO = {
  dongId: number;
  regionTotalName: string;
};

type RegionSearchResponse = {
  regionSearchDTOList: RegionSearchDTO[];
  nextCursor: number;
  hasNext: boolean;
};

export type {RegionSearchResponse};
