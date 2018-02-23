export const formatResponse = response => {
  return response.json().then(data => {
    return { data, status: response.status };
  });
};
