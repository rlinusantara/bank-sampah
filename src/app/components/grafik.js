import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "chart.js/auto";
import axios from "axios";
import SpinnerLoading from "./spinner";

const Grafik = ({ grafikTotalSetoran, tahun }) => {
  const [loadingGrafik, setLoadingGrafik] = useState(false);
  const [barChartData, setBarChartData] = useState({
    labels: [
      "Januari",
      "Februari",
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
        data: [],
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
  });
  const [msgError, setMsgError] = useState("");

  const fil = () => {
    const data = [];
    let indexGrafik = 0;
    for (let i = 1; i <= 12; i++) {
      const mGrafik = grafikTotalSetoran[indexGrafik]?._id;
      if (i === mGrafik) {
        data.push(grafikTotalSetoran[indexGrafik].total_setoran);

        indexGrafik++;
      } else {
        data.push(0);
      }
    }

    setBarChartData({
      labels: [
        "Januari",
        "Februari",
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
          data: data,
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
    });
  };

  useEffect(function () {
    fil();
  }, []);

  const ubahTahun = async (e) => {
    try {
      setLoadingGrafik(true);
      const changeTahun = +e.target.value;

      const { data } = await axios.get(
        `/api/admin/grafik-total-setoran/${changeTahun}`,
        {
          withCredentials: true,
        }
      );

      const grafikTotalSetoran = data?.data;

      const dataBaru = [];
      let indexGrafik = 0;
      for (let i = 1; i <= 12; i++) {
        const mGrafik = grafikTotalSetoran[indexGrafik]?._id;

        if (i === mGrafik) {
          dataBaru.push(grafikTotalSetoran[indexGrafik].total_setoran);
          indexGrafik++;
        } else {
          dataBaru.push(0);
        }
      }

      setBarChartData({
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
            label: `Grafik Setoran Tahun ${changeTahun}`,
            data: dataBaru,
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
      });

      setLoadingGrafik(false);
    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <>
      <div className="mt-4">
        <div className="flex">
          <h1 className="p-1 xl:text-lg">Pilih tahun : </h1>
          <select className="p-1 w-20 lg:w-fit rounded-sm" onChange={ubahTahun}>
            {tahun.map((v, i) => (
              <option value={v} key={i}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mt-4">
          {loadingGrafik ? (
            <section className="absolute top-0 left-0 right-0 bottom-0 bg-transparent flex justify-center items-center rounded-md">
              {msgError ? (
                <section>
                  <p className="text-center text-red-500  font-medium text-lg">
                    {msgError}
                  </p>
                  <p className="text-centerfont-semibold text-lg">
                    Cobalah untuk merefresh halaman
                  </p>
                </section>
              ) : (
                <SpinnerLoading />
              )}
            </section>
          ) : (
            ""
          )}
          <Bar data={barChartData} />
        </div>
      </div>
    </>
  );
};

export default Grafik;
