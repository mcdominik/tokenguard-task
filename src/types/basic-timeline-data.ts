interface GrowthIndexEntry {
  date: string;
  value: number;
}

export interface GrowthIndex {
  tg_growth_index: GrowthIndexEntry[];
}

export interface BasicTimeLineData {
  blockchain: GrowthIndex;
  cumulative: GrowthIndex;
}
