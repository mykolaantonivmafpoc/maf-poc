/* eslint-disable import/prefer-default-export */
export function formatDate(date) {
  let formatedDate = '';

  if (date instanceof Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().substr(-2);

    formatedDate = `${day}/${month}/${year}`;
  }

  return formatedDate;
}
