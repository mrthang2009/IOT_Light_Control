// import axiosClient from 'utils/axios';
import { v4 as uuidv4 } from 'uuid';

import images from 'src/assets';
import { MEAL_TYPE } from 'src/constants';

// const endpoint = '/column-list';

const COLUMN_LIST = [
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    image: images.d01,
    meal: MEAL_TYPE.MORNING,
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    image: images.d02,
    meal: MEAL_TYPE.LUNCH,
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    image: images.d03,
    meal: MEAL_TYPE.DINNER,
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    image: images.d04,
    meal: MEAL_TYPE.SNACK,
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    image: images.d05,
    meal: MEAL_TYPE.MORNING,
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    image: images.d06,
    meal: MEAL_TYPE.LUNCH,
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    image: images.d07,
    meal: MEAL_TYPE.DINNER,
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    image: images.d08,
    meal: MEAL_TYPE.SNACK,
  },
];

export default {
  async getMealList() {
    // const path = `${endpoint}`;

    // const response = await axiosClient.get(path);

    const response = COLUMN_LIST.map((item) => ({
      ...item,
      id: uuidv4(),
    }));

    return response;
  },
};
