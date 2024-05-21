import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Forecast = ({ title, data = [] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const labels = data.map((d) => d.title);
    const temperatures = data.map((d) => d.temp);
    let myChart = null;

    if (chartRef.current !== null) {
      if (myChart) {
        myChart.destroy();
      }

      myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Temperature",
              data: temperatures,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              display: false,
              beginAtZero: true,
              grid: {
                display: false,
              },
              ticks: {
                color: 'white',
              },
            },
            x: {
              grid: {
                display: false,
              
              },
              ticks: {
                color: 'white',
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          elements: {
            bar: {
              borderWidth: 0,
            },
          },
        },
      });
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <div className="relative flex items-center justify-start mt-6 text-white">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />
      <div className="relative flex items-center justify-around">
        {data.map((d, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            {/* <p className="font-medium">{d.title}</p> */}
            <img src={d.icon} alt="weather-icon" className="w-10 my-1" />
            <p className="font-medium">{`${Math.round(d.temp)}`}°</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-3">
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
