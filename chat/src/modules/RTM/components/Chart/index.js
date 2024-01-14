import React from "react";
import Chart from "react-apexcharts";
import styles from "../../css/style.module.css";
function ChartGraph({ data }) {
  const chartOptions = {
    chart: {
      width: "90%",
      height: 400,
      type: "area",
      events: {
        // click(event, chartContext, config) {
        //   const { seriesIndex, dataPointIndex } = config;
        //   const xValue = data[dataPointIndex].time;
        //   const seriesName = chartContext.w.globals.seriesNames[seriesIndex];
        //   const dataPoint =
        //     chartContext.w.globals.series[seriesIndex][dataPointIndex];
        // },
      },
    },
    series: [
      {
        name: "Chat Count",
        data: data.map((item) => item["Chat Count"]),
      },
    ],
    xaxis: {
      categories: data.map((item) => item.time),
      labels: {
        rotate: 360, // Rotate the labels for better visibility
      },
      tickAmount: 5,
    },
    grid: {
      show: false, // Hide grid lines
    },
    dataLabels: {
      enabled: false, // Disable data labels on lines
    },
  };

  return (
    <div className={styles.chartBox}>
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type={chartOptions.chart.type}
        width={chartOptions.chart.width}
        height={chartOptions.chart.height}
      />
    </div>
  );
}

export default ChartGraph;
