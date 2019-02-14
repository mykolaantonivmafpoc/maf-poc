export const API_ROOT = process.env.REACT_APP_API_ROOT;
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
