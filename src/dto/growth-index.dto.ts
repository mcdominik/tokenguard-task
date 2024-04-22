export enum Period {
  LAST_WEEK = "last week",
  LAST_MONTH = "last month",
  LAST_YEAR = "last year",
}

export enum Metric {
  TG_GROWTH_INDEX = "tg_growth_index",
}

export enum Chain {
  SOLANA = "solana",
  ETHEREUM = "ethereum",
  POLYGON = "polygon",
}

export enum Granularity {
  WEEK = "WEEK",
  TWO_WEEKS = "TWO_WEEKS",
  MONTH = "MONTH",
}

export interface GrowthIndexDto {
  metric: Metric;
  period: Period;
  chainName: Chain;
  compareWith: Chain[];
  granularity: Granularity;
}
