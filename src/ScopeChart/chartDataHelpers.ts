import { Activity, DataStructure, DrilldownSeriesItem, SeriesDataItem } from "../types/types";
import { getSumOfNumbersInNestedArray } from "../util/helpers";

export function getSeriesData(data: DataStructure): SeriesDataItem[] {
  if (!data) return [];

  const seriesData: SeriesDataItem[] = [];

  Object.entries(data).forEach(([scope, categories]) => {
    const scopeSum = getSumOfNumbersInNestedArray(Object.values(categories));
    const hasCategories = !!Object.values(categories).length;

    seriesData.push({
      name: scope,
      y: scopeSum,
      drilldown: hasCategories ? scope : null,
    });
  });

  return seriesData;
}

export function getDrilldownSeries(data: DataStructure): DrilldownSeriesItem[] {
  if (!data) return [];

  const drilldownSeries: DrilldownSeriesItem[] = [];

  Object.entries(data).forEach(([scope, categories]) => {
    const categoryData: SeriesDataItem[] = [];

    Object.entries(categories).forEach(([category, activities]) => {
      const typedActivities: Activity[] = activities as Activity[];

      drilldownSeries.push({
        name: category,
        id: category,
        data: typedActivities.map(([name, value]): [string, number] => [name, value]),
      });

      categoryData.push({
        name: category,
        y: getSumOfNumbersInNestedArray(typedActivities),
        drilldown: category,
      });
    });

    drilldownSeries.push({
      name: scope,
      id: scope,
      data: categoryData,
    });
  });

  return drilldownSeries;
}
