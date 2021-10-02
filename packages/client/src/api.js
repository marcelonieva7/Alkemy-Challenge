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

export const deleteOperation = async (id) => {
  const response = await fetch(`${BASE_URL}api/operations/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    return id;
  } else {
    throw new Error('Fail to delete data');
  }
};

export const updateteOperation = async (id, body) => {
  const response = await fetch(`${BASE_URL}api/operations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const responseJSON = await response.json();

  if (response.ok) {
    return responseJSON;
  } else {
    throw new Error('Fail to update data');
  }
};

export const saveOperation = async (body) => {
  const response = await fetch(`${BASE_URL}api/operations/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const responseJSON = await response.json();

  if (response.ok) {
    return responseJSON;
  } else {
    throw new Error('Fail to save data');
  }
};
