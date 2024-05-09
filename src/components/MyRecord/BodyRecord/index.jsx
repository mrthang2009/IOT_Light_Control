import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Title,
  Legend,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';

// import PropTypes from 'prop-types';
import { convertIsoDateToString } from 'src/utils';

import styles from './BodyRecord.module.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const labels = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.random({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.random({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function BodyRecord() {
  // const { exerciseList } = props;

  return (
    <div className={styles.BodyRecord}>
      <h3 className={styles.BodyRecord__title}>MY EXERCISE</h3>

      <h4 className={styles.BodyRecord__Time}>{convertIsoDateToString(new Date())}</h4>

      <div className={styles.Chart}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

BodyRecord.propTypes = {
  // exerciseList: PropTypes.instanceOf(Array).isRequired,
};

export default BodyRecord;
