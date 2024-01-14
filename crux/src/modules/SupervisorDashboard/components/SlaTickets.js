import React, { useEffect, useState } from "react";
import styles from "../css/chart.module.css";
import Select from "react-select";
import Chart from "react-apexcharts";
import { customStyles, options } from "./seed";

function SlaTickets({ chartData, resolve_within_sla, infoData }) {
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
      (sum, item) => sum + item.value,
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
      type: "area", // Change the chart type to "area"
      toolbar: {
        show: true,
      },
    },
    series: [
      {
        name: "Percentage",
        data: data.map((item) => item.value),
      },
    ],

    fill: {
      type: "solid", // Set fill type to solid
      colors: ["#18A0FB"], // Set the fill color for the area
      opacity: 0,
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
      show: false, // Hide grid lines
    },
    dataLabels: {
      enabled: false, // Disable data labels on lines
      style: {
        fontSize: "11px",
      },
    },
  };

  function percentageSla(selectValue) {
    if (selectValue == "tickets") {
      return infoData.ticket.resolve_within_sla_per;
    } else if (selectValue == "chats") {
      return infoData.chat.resolve_within_sla_per;
    } else {
      return infoData.resolve_within_sla_per;
    }
    // return (time / count) * 100;
  }

  return (
    <div className={styles.chartBox}>
      <div className={styles.chart_header}>
        <p>SLA Tickets</p>

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
          <span>Percentage</span>
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
          <p>Avg. SLA</p>
          <span>{percentageSla(selectValue)}%</span>
        </div>
      </div>
    </div>
  );
}

export default SlaTickets;
