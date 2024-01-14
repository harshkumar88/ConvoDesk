import React, { useEffect, useState } from "react";
import styles from "../css/chart.module.css";
import Select from "react-select";
import Chart from "react-apexcharts";
import { customStyles, options } from "./seed";

function AvgResolutionTime({
  infoData,
  chartData,
  avg_resolution_time,
  color,
  title,
  gradientToColors,
}) {
  let [data, setData] = useState(
    chartData[Object.keys(chartData).reverse()[0]]
  );
  let [selectValue, setSelectValue] = useState(
    Object.keys(chartData).reverse()[0]
  );
  let [label, setLabel] = useState(false);

  useEffect(() => {
    setLabel(false);
    setData(chartData[selectValue]);

    const has_data = chartData[selectValue].reduce(
      (sum, item) => sum + parseFloat(item.value),
      0
    );
    if (has_data == 0) {
      setLabel(true);
    }
  }, [chartData, selectValue]);

  const chartOptions = {
    chart: {
      width: "100%",
      height: "300",
      type: "area",
      toolbar: {
        show: true,
      },
    },
    series: [
      // {
      //   name: "p",
      //   data: [], // Replace with your data
      // },
      {
        name: "Avg Resolution Time",
        data: data.map((item) => item.value),
        color: color,
      },
    ],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.55,
        gradientToColors: gradientToColors,
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: data.map((item) => item.label),
      labels: {
        rotate: 0,
        style: {
          fontSize: "11px",
        },
      },
      tickAmount: 4,
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "11px",
        },
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "11px",
      },
    },
    legend: {
      show: false,
    },
  };

  function getAvgResolutionTime(type) {
    // console.log(type, "ss");
    if (type == "chats") {
      return infoData.chat.avg_resolution_time;
    } else if (type == "tickets") {
      return infoData.ticket.avg_resolution_time;
    } else {
      return infoData.avg_resolution_time;
    }
  }

  return (
    <div className={styles.chartBox}>
      <div className={styles.chart_header}>
        <p>{title}</p>

        <Select
          options={Object.keys(chartData)
            .reverse()
            .map((item) => {
              if (item == "tickets") {
                return { label: "calls", value: item };
              } else {
                return { label: item, value: item };
              }
            })}
          className={styles.chart_dropdown}
          styles={customStyles}
          placeholder="Chats"
          value={Object.keys(chartData).map((item) => {
            if (item == selectValue && selectValue == "tickets")
              return { label: "calls", value: item };
            else if (item === selectValue) {
              return { label: item, value: item };
            }
          })} // Find the option with the selected value
          onChange={(e) => setSelectValue(e.value)}
        />
      </div>
      <div className={styles.chart_flex}>
        <p className={styles.title}>
          <span>Time</span>
        </p>
        <div className={styles.apex_charts}>
          {label && <p className={styles.chart_no_data_found}>No Data Found</p>}
          <Chart
            options={chartOptions}
            series={chartOptions.series}
            type={chartOptions.chart.type}
            width={chartOptions.chart.width}
            height={chartOptions.chart.height}
          />
        </div>
        <div className={styles.total_values}>
          <p>Avg.resolution</p>
          <span>time</span>
          <span>{getAvgResolutionTime(selectValue)}</span>
        </div>
      </div>
    </div>
  );
}

export default AvgResolutionTime;
