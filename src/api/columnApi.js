// import axiosClient from 'utils/axios';
import { v4 as uuidv4 } from 'uuid';

import images from 'src/assets';

// const endpoint = '/column-list';

const COLUMN_LIST = [
  {
    image: images.columnPic1,
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    title:
      '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    tags: ['魚料理', '和食', 'DHA'],
  },
  {
    image: images.columnPic2,
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    title:
      '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    tags: ['魚料理', '和食', 'DHA'],
  },
  {
    image: images.columnPic3,
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    title:
      '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    tags: ['魚料理', '和食', 'DHA'],
  },
  {
    image: images.columnPic4,
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    title:
      '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    tags: ['魚料理', '和食', 'DHA'],
  },
  {
    image: images.columnPic5,
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    title:
      '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    tags: ['魚料理', '和食', 'DHA'],
  },
  {
    image: images.columnPic6,
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    title:
      '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    tags: ['魚料理', '和食', 'DHA'],
  },
  {
    image: images.columnPic7,
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    title:
      '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    tags: ['魚料理', '和食', 'DHA'],
  },
  {
    image: images.columnPic8,
    timeStamp: 'Tue Apr 25 2023 22:37:19 GMT+0700 (Indochina Time)',
    title:
      '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    tags: ['魚料理', '和食', 'DHA'],
  },
];

export default {
  async getColumnList() {
    // const path = `${endpoint}`;

    // const response = await axiosClient.get(path);

    const response = COLUMN_LIST.map((item) => ({
      ...item,
      id: uuidv4(),
    }));

    return response;
  },
};
