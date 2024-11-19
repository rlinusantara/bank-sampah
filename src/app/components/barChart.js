"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function HorizontalBarChart({ dataTabungan = [], labels = [] }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Tabungan",
        data: dataTabungan,
        backgroundColor: ["#347928"],
        borderColor: ["#347928"],
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Grafik Tabungan Customer",
        font: {
          size: 25,
          weight: "bold",
        },
        color: "#00000",
      },
    },
  };

  const barSpacing = 40;
  const dynamicHeight = data.labels.length * (30 + barSpacing);

  return (
    <div className=" overflow-auto w-full">
      <div style={{ width: "1870px", height: `${dynamicHeight}px` }}>
        {" "}
        {/* Lebar grafik bisa lebih besar */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
