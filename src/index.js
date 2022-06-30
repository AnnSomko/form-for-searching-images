import ImagesApiService from './imagesAPI';

let searchForm = document.querySelector('#search-form');
let imagesContainer = document.querySelector('.gallery');
let loadMore = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);

const imagesApiService = new ImagesApiService();

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(hits => {
    clearImagesContainer();
    renderImagesMarkup(hits);
  });
}

function onLoadMore() {
  imagesApiService.fetchImages().then(renderImagesMarkup);
}

function renderImagesMarkup(hits) {
  const markup = hits
    .map(image => {
      `<div class="photo-card">
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
