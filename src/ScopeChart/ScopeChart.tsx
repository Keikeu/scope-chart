import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown.js";
import { useMemo } from "react";
import { DrilldownSeriesItem, SeriesDataItem } from "../types/types";

drilldown(Highcharts);

function ScopeChart({
  seriesData,
  drilldownSeries,
}: {
  seriesData: SeriesDataItem[];
  drilldownSeries: DrilldownSeriesItem[];
}) {
  const options = useMemo(() => {
    return {
      chart: {
        type: "pie",
        height: "600px",
      },
      title: {
        text: "Emissions by scope",
        align: "left",
      },
      subtitle: {
        text: "Click the slices to view subgroups.",
        align: "left",
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        series: {
          borderRadius: 4,
          dataLabels: [
            {
              enabled: true,
              distance: 24,
              style: {
                textOverflow: "ellipsis",
              },
            },
            {
              enabled: true,
              distance: "-20%",
              filter: {
                property: "percentage",
                operator: ">",
                value: 4,
              },
              format: "{point.percentage:.0f}%",
              style: {
                fontSize: "0.9em",
                textOutline: "none",
              },
            },
          ],
        },
      },
      tooltip: {
        headerFormat: null,
        pointFormat: `
				<span style="font-size: 12px"><span style="color:{point.color}; font-weight: 600">{point.name}</span>
					</br><b>Total:</b> {point.y:.2f} tonnes CO2e
					<br/><b>Percentage:</b> {point.percentage:.2f}%
				</span>
				`,
      },
      series: [
        {
          name: "Scope",
          colorByPoint: true,
          data: seriesData,
        },
      ],
      drilldown: {
        series: drilldownSeries,
        activeDataLabelStyle: {
          color: "#323236",
        },
      },
    };
  }, [seriesData, drilldownSeries]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default ScopeChart;
