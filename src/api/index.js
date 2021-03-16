import Axios from 'axios';
import baseURL, { URLs } from './URLS';

const appkey = 'dd_1597654682810';

const request = Axios.create({
  baseURL,
  params: {
    appkey,
  },
});

request.interceptors.response.use(data => data.data);

const getGoodsList = (value, page, size, sort = 'all') => request.get(
  URLs.getGoodsList,
  {
    params: {
      type: value, page, size, sort,
    },
  },
);

const getSideArr = (value) => request.get(URLs.getSide,{params:{type:value}});

const likeSearch = (value) => request.get(
  URLs.likeSearch,
  {
    params: {likeValue: value}
  },
);

const search = (type, page, size) => request.get(
  URLs.search,
  {
    params: {type, page, size}
  },
);

const getGoodsByIds = value => request.get(
  URLs.getGoodsByIds,
  {
    params: { value }
  }
)

export default {
  getSideArr,
  getGoodsList,
  likeSearch,
  search,
  getGoodsByIds,
};
