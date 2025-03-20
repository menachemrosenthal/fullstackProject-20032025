const API_URL = 'http://localhost:8000';

const checkResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text(); 
    throw new Error(`ERROR message: ${error}`);
  }
  try {
    return await response.json();
  } catch (error) {
    throw new Error('Failed to parse JSON response');
  }
};

export const fetchData = async (endpoint) => {
  const response = await fetch(`${API_URL}/${endpoint}`);
  return checkResponse(response);
};

export const postData = async (endpoint, data) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return checkResponse(response);
};

export const putData = async (endpoint, data) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return checkResponse(response);
};

export const deleteData = async (endpoint) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'DELETE',
  });
  return checkResponse(response);
};
