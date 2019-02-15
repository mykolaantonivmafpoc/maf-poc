export const API_ROOT = process.env.REACT_APP_API_ROOT || 'https://api-develop.maf-poc.com/';
export const API_PATH = '/v1';

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

const listColumns = [
  { name: 'Campaign', id: 'campaign' },
  { name: 'Sales', id: 'sales' },
  { name: 'Margin', id: 'margin' },
  { name: 'Traffic', id: 'traffic' },
  { name: 'Basket', id: 'basket' },
  { name: 'TSE', id: 'tse' }
];
export const campaignListTableDef = { groups: [{ name: '', id: '', columns: listColumns }] };


const generalColumns = [
  { name: 'Campaign', id: 'campaign' },
  { name: 'Total Sales', id: 'totalSales' },
  { name: 'Volume', id: 'volume' }
];
const increaseColumns = [
  { name: 'Sales', id: 'sales' },
  { name: 'Margin', id: 'margin' },
  { name: 'Traffic', id: 'traffic' },
  { name: 'Basket', id: 'basket' },
  { name: 'TSE', id: 'tse' }
];
const priceColumns = [
  { name: 'Promo', id: 'promo' },
  { name: 'Slash', id: 'slash' },
  { name: 'Cosnt', id: 'cosnt' }
];
const promoColumns = [
  { name: 'Depth', id: 'depth' },
  { name: 'Mechanics', id: 'mechanics' }
];
export const productListTableDef = {
  groups: [
    { name: 'General', id: 'general', columns: generalColumns },
    { name: 'Increase', id: 'increase', columns: increaseColumns },
    { name: 'Price', id: 'price', columns: priceColumns },
    { name: 'Promo', id: 'promo', columns: promoColumns }
  ],
  selectedGroupId: 'increase'
};
