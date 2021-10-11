export const listData = user => ({
  type: 'DATA_REQUEST',
  payload: user,
});

export const reinitializeArray = data => ({
  type: 'EMPTY_ARRAY',
  payload: data,
});
