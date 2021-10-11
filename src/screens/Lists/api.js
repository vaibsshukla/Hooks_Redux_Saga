import Constants from '../../res/Constants';

export const getList = async param => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  let params = {};
  // params.page = page;
  console.log('=>' + JSON.stringify(param));

  return fetch('https://hn.algolia.com/api/v1/search_by_date?' + param, {
    method: Constants.getRequest,
    headers,
    params,
  })
    .then(response => {
      return response.json();
    })
    .then(async data => {
      return data;
    })
    .catch(async error => {
      // eslint-disable-next-line no-new
      new Error(error);
    });
};
