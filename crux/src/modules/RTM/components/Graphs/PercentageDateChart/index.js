import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import styles from "../../Graphs/css/style.module.css";
function PercentageDateGraph({ data, title }) {
  const [selectedOption1, setSelectedOption1] = useState(Object.keys(data)[0]);
  const [selectedOption2, setSelectedOption2] = useState(
    Object.keys(data[Object.keys(data)[0]])[0]
  );
  const [option1, setOption1] = useState([]);
  const [option2, setOption2] = useState([]);

  useEffect(() => {
    let option1_values = Object.keys(data);
    let option2_values = Object.keys(data[option1_values[0]]);
    setOption1(option1_values);
    setOption2(option2_values);
    setSelectedOption1(option1_values[0]);
    setSelectedOption2(option2_values[0]);
  }, [data]);

  // Function to handle dropdown change
  const handleDropdownChange1 = (event) => {
    let option2_values = Object.keys(data[event.target.value]);
    setOption2(option2_values);
    setSelectedOption2(option2_values[0]);
    setSelectedOption1(event.target.value);
  };
  const handleDropdownChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const chartOptions = {
    chart: {
      width: "100%",
      height: 300,
      type: "area",
    },
    series: [
      {
        name: "percentage",
        data: data[selectedOption1][selectedOption2].map(
          (item) => item["percentage"]
        ),
      },
    ],
    fill: {
      type: "solid", // Set fill type to solid
      colors: ["transparent"], // Set the fill color to transparent
    },
    xaxis: {
      categories: data[selectedOption1][selectedOption2].map(
        (item) => item.date
      ),
      labels: {
        rotate: 360, // Rotate the labels for better visibility
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

  return (
    <div className={styles.chartBox}>
      <div className={styles.chart_header}>
        <div>
          <p>{title}</p>
        </div>
        <div className={styles.chart_dropdown}>
          <div>
            <select value={selectedOption1} onChange={handleDropdownChange1}>
              {option1.map((item, idx) => {
                return (
                  <option value={item} key={idx}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <select value={selectedOption2} onChange={handleDropdownChange2}>
              {option2.map((item, idx) => {
                return (
                  <option value={item} key={idx}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
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

export default PercentageDateGraph;
