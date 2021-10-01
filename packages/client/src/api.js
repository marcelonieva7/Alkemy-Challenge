const BASE_URL = 'http://localhost:8000/';

export const getAllOperations = async (limit) => {
  const response = await fetch(`${BASE_URL}api/operations/${limit ? '?limit=' + limit : ''}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const getOperations = await response.json();

  if (response.ok) {
    return getOperations;
  } else {
    throw new Error('Fail to get data');
  }
};
