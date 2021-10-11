export const AppInfo = {
  baseUrlAPI: 'https://hn.algolia.com/api',
  apiVersion: 'v1',
  serviceTimeOut: 20000,
};
export default {
  getRequest: 'GET',
  baseURL: AppInfo.baseUrlAPI + '/' + AppInfo.apiVersion + '/',

  listApi: 'search_by_date?tags=story&',
};

export const Search = [{value: 'all'}, {value: 'story'}];

export const By = [{value: 'byPopularity'}, {value: 'byDate'}];

export const For = [
  {value: 'last24h'},
  {value: 'pastWeek'},
  {value: 'pastMonth'},
];
