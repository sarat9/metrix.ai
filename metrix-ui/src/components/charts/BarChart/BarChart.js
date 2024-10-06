import { Chart as ChartJs, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React from 'react';


ChartJs.register(...registerables);

const BarChart = (props) => {
    const {labels, values} = props;

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Metric Data',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options
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
