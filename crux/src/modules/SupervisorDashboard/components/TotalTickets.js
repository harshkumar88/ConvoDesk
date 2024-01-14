import React, { useEffect, useState } from "react";
import styles from "../css/chart.module.css";
import Select from "react-select";
import Chart from "react-apexcharts";
import { customStyles, options } from "./seed";

function TotalTickets({ infoData, chartData, tickets_ct }) {
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
      type: "bar",
      toolbar: {
        show: true,
      },
    },
    series: [
      {
        name: "Count",
        data: data.map((item) => item.value),
      },
    ],
    fill: {
      type: "solid",
      colors: ["#CC62FD"],
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: "4px 4px 0px 0px",
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "11px",
      },
    },
  };

  function getTotalTickets(type) {
    // console.log(type, "ss");
    if (type == "chats") {
      return infoData.chat.chat_ct;
    } else if (type == "tickets") {
      return infoData.ticket.ticket_ct;
    } else {
      return infoData.ticket_ct;
    }
  }

  return (
    <div className={styles.chartBox}>
      <div className={styles.chart_header}>
        <p>Total Tickets</p>
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
          <span>Tickets</span>
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
          <p>Total Tickets</p>

          <span>{getTotalTickets(selectValue)}</span>
          {/* <span>{tickets_ct}</span> */}
        </div>
      </div>
    </div>
  );
}

export default TotalTickets;
