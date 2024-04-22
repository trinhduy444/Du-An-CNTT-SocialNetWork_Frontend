import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ userData }) => {
  // Dữ liệu mặc định cho biểu đồ
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Number of Users',
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Cấu hình cho biểu đồ
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
