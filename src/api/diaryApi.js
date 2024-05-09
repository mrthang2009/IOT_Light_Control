// import axiosClient from 'utils/axios';
import { v4 as uuidv4 } from 'uuid';

// const endpoint = '/column-list';

const COLUMN_LIST = [
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    subTitle: '私の日記の記録が一部表示されます。',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    subTitle: '私の日記の記録が一部表示されます。',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    subTitle: '私の日記の記録が一部表示されます。',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    subTitle: '私の日記の記録が一部表示されます。',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    subTitle: '私の日記の記録が一部表示されます。',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    subTitle: '私の日記の記録が一部表示されます。',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    subTitle: '私の日記の記録が一部表示されます。',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
  {
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    subTitle: '私の日記の記録が一部表示されます。',
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
];

export default {
  async getDiaryList() {
    // const path = `${endpoint}`;

    // const response = await axiosClient.get(path);

    const response = COLUMN_LIST.map((item) => ({
      ...item,
      id: uuidv4(),
    }));

    return response;
  },
};
