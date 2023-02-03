import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31696679-bf9e6793322cb75217b9eb83f';
const PER_PAGE = 12;

const instance = axios.create({
  baseURL: BASE_URL,
});

export const searchImages = async (imageRequest, page) => {
  const { data } = await instance.get(
    `/?q=${imageRequest}&page=${page}&key=${API_KEY}&image_type=phoo&orientation=horizontal&per_page=${PER_PAGE}`
  );
  return data;
};

// =============guery  1===============

// axios.defaults.baseURL = BASE_URL;
// export const searchImages = async (imageRequest, page) => {
//   const { data } = await axios.get(
//     `?q=${imageRequest}&page=${page}&key=${API_KEY}&image_type=phoo&orientation=horizontal&per_page=${PER_PAGE}`
//   );
//   return data;
// };
