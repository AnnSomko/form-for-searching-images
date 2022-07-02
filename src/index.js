import ImagesApiService from './imagesAPI';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';

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
    if ((hits = [])) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (totalHits) {
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
      <a class="" href='${image.largeImageURL}'>               
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
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

  let gallery = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
  gallery.refresh();
}

function clearImagesContainer() {
  imagesContainer.innerHTML = '';
}
/*
function onSmoothSroll(hits) {
  const { height: cardHeight = hits.map(item => item.imageHeight) } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
*/
