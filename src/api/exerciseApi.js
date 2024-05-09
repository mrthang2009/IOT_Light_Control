// import axiosClient from 'utils/axios';
import { v4 as uuidv4 } from 'uuid';

// const endpoint = '/column-list';

const COLUMN_LIST = [
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
  {
    title: '家事全般（立位・軽い）',
    calorie: 26,
    duration: 10,
  },
];

export default {
  async getExerciseList() {
    // const path = `${endpoint}`;

    // const response = await axiosClient.get(path);

    const response = COLUMN_LIST.map((item) => ({
      ...item,
      id: uuidv4(),
    }));

    return response;
  },
};
