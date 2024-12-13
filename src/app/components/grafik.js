import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
const Grafik = () => {
    
      const barChartData = {
        labels: ['January', 'February', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        datasets: [
          {
            label: 'Grafik Setoran Sampah Bank Sampah',
            data: [120, 50, 34,50,90,60,103,220,90,100,80,85],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
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
          <select className="p-1 w-20">
            <option value="" key="">
              Pilih
            </option>
          </select>
        </div>
        <div>
        <Bar data={barChartData} />
        </div>
      </div>
        </>
    );
}
 
export default Grafik;