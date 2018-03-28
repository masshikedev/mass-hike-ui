const BASE_URL = 'https://shielded-cove-82777.herokuapp.com';

const formatResponse = response => {
  return response.json().then(data => {
    if (response.status !== 200) {
      throw data.error;
    }
    return { data, status: response.status };
  });
};

export const get = endpoint => {
  return fetch(`${BASE_URL}${endpoint}`, { method: 'get' }).then(
    formatResponse
  );
};

export const post = (endpoint, body) => {
  return fetch(`${BASE_URL}${endpoint}`, {
    body,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  }).then(formatResponse);
};
