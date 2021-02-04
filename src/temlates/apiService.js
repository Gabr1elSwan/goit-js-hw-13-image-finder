export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }


fetchCards() {
  const API_KEY = '19076419-9578a5b9e86945eec97e7243e';
  const BASE_URL = 'https://pixabay.com/api';

  return fetch(
    `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
).then(r => r.json()).then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
}
incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
};