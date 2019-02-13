export const API_ROOT = 'http://localhost:8080';
export const API_PATH = '/v1/';

export const config = {
  apiDefContentType: 'application/json',
};

export const defHeaders = {
  'Content-Type': config.apiDefContentType,
};

export const defOptions = {
  credentials: 'same-origin',
  redirect: 'follow',
};
