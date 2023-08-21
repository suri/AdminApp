const config = require('../../config')
const BACKEND_BASE_URL = config.BACKEND_API_BASE_URL;

console.log("BACKEND_URL: ", BACKEND_BASE_URL)


// const COUNTRY_FLAG = {
//   BASE_URL: `https://flagsapi.com`,
//   SIZE: {16: '16', 24: '24', 32: '32', 48: '48', 64: '64'},
//   STYLE: {FLAT: 'flat', SHINY: 'shiny'},
// };

const STATIC_IMAGE = {
  BASE_URL: `${BACKEND_BASE_URL}/images`,
  TYPE: {POSTER: 'poster', LOGO: 'logo', GALLERY: 'gallery'},
  SIZE: {SQUARE: 'square', LANDSCAPE: 'landscape', PORTRAIT: 'portrait'},
  QUALITY: {SD: 'sd', HD: 'hd'},
};

const BACKEND_API = {
  BASE_API_URL: `${BACKEND_BASE_URL}/api`,
  REGISTER: '/register',
  LOGIN: '/login',
  USER_EXIST: '/user-exist',
  USER: '/user',
  REFRESH_TOKEN: '/refresh-token',
  RESTAURANT: '/restaurant',
//   CART: '/cart',
//   FOOD: '/food',
//   BOOKMARK: '/bookmark',
};

export default {BACKEND_API, STATIC_IMAGE};