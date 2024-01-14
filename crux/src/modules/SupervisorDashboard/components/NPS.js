import React, { useEffect, useState } from "react";
import styles from "../css/chart.module.css";
import Select from "react-select";
import Chart from "react-apexcharts";
import { customStyles, options } from "./seed";

function NPS({ chartData }) {
  let [data, setData] = useState(Object.keys(chartData));
  let [label, setLabel] = useState(false);
  let [totalNps, setTotalNps] = useState(0);

  // let [selectValue, setSelectValue] = useState(Object.keys(chartData)[0]);

  // let labels = ["satisfied", "neutral", "not_satisfied"];
  useEffect(() => {
    setLabel(false);
    const has_data = data.reduce((sum, item) => sum + chartData[item], 0);
    setTotalNps(has_data);
    if (has_data == 0) {
      setLabel(true);
    }
  }, [chartData]);

  const customColors = ["#9BDFC4", "#18A0FB", "#FFB44F"];
  const defaultColors = [
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
  ];

  const numberOfItems = data.length;
  const colors = [
    ...customColors,
    ...defaultColors.slice(customColors.length, numberOfItems),
  ];

  const chartOptions = {
    chart: {
      width: "100%",
      height: "300",
      type: "pie",
      toolbar: {
        show: true,
      },
    },
    series: data.map((item) => {
      return chartData[item];
    }),
    labels: data,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "11px",
      },
    },
    legend: {
      position: "bottom",
      fontSize: "11px",
    },

    colors: colors, // Apply custom colors for the first three items and default colors for the rest
  };

  return (
    <div className={styles.chartBox}>
      <div className={styles.chart_header}>
        <p>NPS</p>
        {/* <Select
          options={options}
          className={styles.chart_dropdown}
          styles={customStyles}
          placeholder="All"
          value={options.find((option) => option.value === selectValue)} // Find the option with the selected value
          onChange={(e) => setSelectValue(e.label)}
        /> */}
      </div>
      <div className={styles.chart_flex}>
        <div className={styles.apex_charts}>
          {label ? (
            <p
              className={`${styles.chart_no_data_found} ${styles.nps_not_found}`}
            >
              No Data Found
            </p>
          ) : (
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type={chartOptions.chart.type}
              width={chartOptions.chart.width}
              height={chartOptions.chart.height}
            />
          )}
        </div>
        <div className={`${styles.nps_not_shown}`}>
          <div className={styles.nps_labels}>
            <span className={styles.design_label}>
              <span className={styles.satisfied_label}></span>
              <span className={styles.satisfied_value}> Satisfied :</span>
            </span>
            <span>
              {chartData["satisfied"] == 0
                ? 0
                : ((chartData["satisfied"] / totalNps) * 100).toFixed(1)}
              %
            </span>
          </div>
          <div className={styles.nps_labels}>
            <span className={styles.design_label}>
              <span className={styles.neutral_label}></span>
              <span className={styles.satisfied_value}> Neutral :</span>
            </span>
            <span>
              {chartData["neutral"] == 0
                ? 0
                : ((chartData["neutral"] / totalNps) * 100).toFixed(1)}
              %
            </span>
          </div>
          <div className={styles.nps_labels}>
            <span className={styles.design_label}>
              <span className={styles.not_satisfied_label}></span>
              <span className={styles.satisfied_value}> Not satisfied :</span>
            </span>
            <span>
              {chartData["not_satisfied"] == 0
                ? 0
                : ((chartData["not_satisfied"] / totalNps) * 100).toFixed(1)}
              %
            </span>
          </div>
          <div className={styles.nps_labels}>
            <span className={styles.design_label}>
              <span className={styles.nps_label}></span>
              <span className={styles.nps_value}>NPS :</span>
            </span>
            <span className={styles.nps_value_data}>
              {totalNps == 0
                ? 0
                : (
                    ((chartData["satisfied"] - chartData["not_satisfied"]) /
                      totalNps) *
                    100
                  ).toFixed(2)}
              {/* {chartData["not_satisfied"] == 0
                ? 0
                : (
                    (chartData["not_satisfied"] /
                      (chartData["satisfied"] +
                        chartData["neutral"] +
                        chartData["not_satisfied"])) *
                    100
                  ).toFixed(1)}
              % */}
            </span>
          </div>
          {/* <p>{title}</p> */}

          {/* <span>{avg_resolution_time}</span> */}
        </div>
      </div>
    </div>
  );
}

export default NPS;
