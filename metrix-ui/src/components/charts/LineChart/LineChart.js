import { Chart as ChartJs, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';


ChartJs.register(...registerables);

const LineChart = (props) => {
    const { title, labels, values, enableAnimation } = props;
    const data = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: values,
                backgroundColor: '#FF6F20', //'rgba(75, 192, 192, 0.6)',
                borderColor: '#FF6F20', //'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                tension: 0.1
            },
        ],
    };

    // Chart options
    const options = {
        scales: {
            x: {
                display: false, // Hide x-axis labels
            },
            y: {
                beginAtZero: true,
            },
        }
    };

    if (enableAnimation) {
        options.animations = {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        }
    }

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};

LineChart.defaultProps = {
    enableAnimation: false
}
export default LineChart;
