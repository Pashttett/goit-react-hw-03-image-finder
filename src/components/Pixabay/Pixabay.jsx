const API_KEY = '38718040-cf73f251e75bc23227b130d01';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchInitialImages = (searchQuery, page) => {
  const URL = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(URL)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};
