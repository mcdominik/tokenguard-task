import axios from "axios";
import { Granularity, GrowthIndexDto } from "../dto/growth-index.dto";
import { BasicTimeLineData, GrowthIndex } from "../types/basic-timeline-data";

export const getGrowthIndex = async ({
  granularity,
  ...payload
}: GrowthIndexDto): Promise<BasicTimeLineData> => {
  const response = await axios.post(
    "/growth-index/basic-timeline-data",
    payload
  );
  return filterGrowthIndexByGranularity(response.data, granularity);
};

function mapGranularityToDivisor(granularity: Granularity): number {
  switch (granularity) {
    case Granularity.WEEK:
      return 1;
    case Granularity.TWO_WEEKS:
      return 2;
    case Granularity.MONTH:
      return 4;
    default:
      throw new Error("Unknown granularity");
  }
}

export const filterGrowthIndexByGranularity = (
  data: BasicTimeLineData,
  granularity: Granularity
): BasicTimeLineData => {
  const divisor = mapGranularityToDivisor(granularity);
  const filteredBlockchain: GrowthIndex = {
    tg_growth_index: data.blockchain.tg_growth_index.filter(
      (_, index) => index % divisor === 0
    ),
  };

  const filteredCumulative: GrowthIndex = {
    tg_growth_index: data.cumulative.tg_growth_index.filter(
      (_, index) => index % divisor === 0
    ),
  };

  return {
    blockchain: filteredBlockchain,
    cumulative: filteredCumulative,
  };
};
