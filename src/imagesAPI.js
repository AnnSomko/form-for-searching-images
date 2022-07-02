import axios from 'axios';

const API_KEY = '28329957-abfecd61523ca859322fdae14';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiService {
  constructor() {
    this.inputQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    try {
      const url = `${BASE_URL}?key=${API_KEY}&q=${this.inputQuery}&image_type=photo
        &orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
      return await axios
        .get(url)
        .then(response => response.json())
        .then(data => {
          this.incrementPage();
          return data;
        });
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.inputQuery;
  }

  set query(newQuery) {
    this.inputQuery = newQuery;
  }
}
