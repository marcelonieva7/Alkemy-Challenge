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

export const getAllIncomes = async (limit) => {
  const response = await fetch(`${BASE_URL}api/incomes${limit ? '?limit=' + limit : ''}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const getIncomes = await response.json();

  if (response.ok) {
    return getIncomes;
  } else {
    throw new Error('Fail to get data');
  }
};

export const deleteIncome = async (id) => {
  const response = await fetch(`${BASE_URL}api/incomes/${id}`, {
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

export const updateIncome = async (id, body) => {
  const response = await fetch(`${BASE_URL}api/incomes/${id}`, {
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

export const saveIncome = async (body) => {
  const response = await fetch(`${BASE_URL}api/incomes`, {
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

export const getAllExpenses = async (category) => {
  const response = await fetch(
    `${BASE_URL}api/expenses${category ? `?category=${category}` : ''}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const getExpenses = await response.json();

  if (response.ok) {
    return getExpenses;
  } else {
    throw new Error('Fail to get data');
  }
};

export const deleteExpense = async (id) => {
  const response = await fetch(`${BASE_URL}api/expenses/${id}`, {
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

export const updateExpense = async (id, body) => {
  const response = await fetch(`${BASE_URL}api/expenses/${id}`, {
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

export const saveExpense = async (body) => {
  const response = await fetch(`${BASE_URL}api/expenses`, {
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
