import ImagesApiService from './imagesAPI';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let searchForm = document.querySelector('#search-form');
let imagesContainer = document.querySelector('.gallery');
let loadMore = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);

loadMore.hidden = true;

const imagesApiService = new ImagesApiService();

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(hits => {
    clearImagesContainer();
    renderImagesMarkup(hits);
    loadMore.hidden = false;
    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (totalHits) {
      loadMore.hidden = true;
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

function onLoadMore() {
  imagesApiService.fetchImages().then(renderImagesMarkup);
}

function renderImagesMarkup(hits) {
  const markup = hits
    .map(image => {
      return `<div class="photo-card">
    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes ${image.likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${image.views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${image.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${image.downloads}</b>
      </p>
    </div>
  </div>`;
    })
    .join('');
  imagesContainer.innerHTML = markup;
}

function clearImagesContainer() {
  imagesContainer.innerHTML = '';
}
