import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";

const Grafik = ({ grafikTotalSetoran }) => {
  const [dataGrafik, setDataGrafik] = useState(grafikTotalSetoran);
  const isiGrafik = dataGrafik.data[0].data.map((item) => item.total_setoran);
  useEffect(function () {
    
  },[])
  const barChartData = {
    labels: [
      "January",
      "February",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    datasets: [
      {
        label: `Grafik Setoran Tahun`,
        data: isiGrafik,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="mt-4">
        <div className="flex">
          <h1 className="p-1 xl:text-lg">Pilih tahun : </h1>
          <select
            className="p-1 w-20 lg:w-fit"
          >
            <option value="">Pilih tahun</option>
            {dataGrafik.data[0].tahun[0].list_tahun.map((tahun) => (
              <option value={tahun} key={tahun}>
                {tahun}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Bar data={barChartData} />
        </div>
      </div>
    </>
  );
};

export default Grafik;
