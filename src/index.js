import imagesAPI from './imagesAPI';

const refs = {
  searchForm: document.querySelector('#search-form'),
  imagesContainer: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

const images = new imagesAPI();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  formInputValue.value = e.currentTarget.elements.searchQuery.value;
  images.fetchImages();
}

function onLoadMore() {
  images.fetchImages();
}
