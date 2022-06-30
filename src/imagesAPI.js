export default class imagesAPI {
  constructor() {
    this.formInputValue = '';
  }

  fetchImages() {
    console.log(this);
    let API_KEY = '28329957-abfecd61523ca859322fdae14';
    let url =
      'https://pixabay.com/api/?key=' +
      API_KEY +
      '&q=' +
      encodeURIComponent(this.formInputValue) +
      '&image_type=photo&orientation=horizontal&safesearch=true';
    fetch(url)
      .then(r => r.json())
      .then(console.log);
  }

  get value() {
    return this.formInputValue;
  }

  set value(newValue) {
    this.formInputValue = newValue;
  }
}
