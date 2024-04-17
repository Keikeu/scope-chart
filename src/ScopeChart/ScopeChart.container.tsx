import { useEffect, useMemo, useState } from "react";
import { DataStructure } from "../types/types";
import { getDrilldownSeries, getSeriesData } from "./chartDataHelpers";
import ScopeChart from "./ScopeChart";
import mockApiCall from "../util/mockApi";

function ScopeChartContainer() {
  const [data, setData] = useState<DataStructure | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await mockApiCall();
        setData(res);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const seriesData = useMemo(() => getSeriesData(data as DataStructure), [data]);
  const drilldownSeries = useMemo(() => getDrilldownSeries(data as DataStructure), [data]);

  if (isLoading) return <div>Loading...</div>;

  return <ScopeChart seriesData={seriesData} drilldownSeries={drilldownSeries} />;
}

export default ScopeChartContainer;
