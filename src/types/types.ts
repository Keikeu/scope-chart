export type NestedNumberArray = Array<number | NestedNumberArray>;

export type Activity = [string, number, "tonnes CO2e"?];

export type DataStructure = Record<string, Record<string, Activity[]>>;

export interface SeriesDataItem {
  name: string;
  y: number;
  drilldown: string | null;
}

export interface DrilldownSeriesItem {
  name: string;
  id: string;
  data: Array<[string, number]> | Array<SeriesDataItem>;
}
