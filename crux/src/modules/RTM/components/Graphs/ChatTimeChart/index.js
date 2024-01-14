import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import styles from "../../Graphs/css/style.module.css";
function ChatTimeGraph({ data }) {
  const [seriesData, setseriesData] = useState([]);
  useEffect(() => {
    getSeriesData();
  }, [data]);

  const chartOptions = {
    chart: {
      width: "100%",
      height: 300,
      type: "area",
    },
    series: seriesData,

    fill: {
      type: "solid", // Set fill type to solid
      colors: ["transparent"], // Set the fill color to transparent
    },
    xaxis: {
      categories: data?.hours?.map((item) => {
        return item;
      }),
      labels: {
        rotate: 360, //Rotate the labels for better visibility
        style: {
          fontSize: "11px",
        },
      },
      tickAmount: 5,
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "11px",
        },
      },
    },

    grid: {
      show: false, // Hide grid lines
    },
    dataLabels: {
      enabled: false, // Disable data labels on lines
    },
  };

  function getSeriesData() {
    if (data?.trend) {
      let keys = Object.keys(data?.trend);
      let series_data = [];
      keys.map((item) => {
        let obj = {
          name: data?.trend[item].date,
          data: data?.trend[item].hours.map((item) => item),
        };
        series_data.push(obj);
      });
      setseriesData(series_data);
    }
  }

  return (
    <div className={styles.chartBox}>
      <div className={styles.chart_header}>
        <div>
          <p>Conversations VS Time</p>
        </div>
      </div>

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

export default ChatTimeGraph;
