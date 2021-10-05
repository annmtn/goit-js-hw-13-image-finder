import './sass/main.scss';
import 'material-icons/iconfont/material-icons.css';

import refs from './js/refs.js';
const { formSearch, imgGallery, loadMoreBtn, loadMoreLabel, loadMoreSpinner } = refs;

import BtnService from './js/btnService.js';
import ApiService from './js/apiService.js';

import imageCard from './templates/image-card.hbs';

import { Notify } from 'notiflix';

const imageService = new ApiService();
const button = new BtnService({
  loadMoreBtn: loadMoreBtn,
  loadMoreLabel: loadMoreLabel,
  loadMoreSpinner: loadMoreSpinner,
  classList: 'd-none',
});

const fetchImg = () => {
  button.disable();

  imageService.fetchImg().then(data => {
    imageService.getPerPage();

    if (data.hits.length > 0) {
      Notify.success(`Найдено ${data.total} картинок`);
    }

    if (data.hits.length === 0) {
      Notify.warning('Картинки не найдены');
      button.hidden();
      return;
    }

    imgGallery.insertAdjacentHTML('beforeend', imageCard(data.hits));

    button.show();
    button.enable();

    imgGallery.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });

    if (data.hits.length <= data.total % imageService.getPerPage()) {
      Notify.success(`Больше картинок нет`);
      button.hidden();
    }
  });
};

const searchImg = event => {
  event.preventDefault();
  imageService.resetPage();
  clearImgGallery();

  const userRequest = event.currentTarget.elements.query.value.trim();
  imageService.query = userRequest;

  fetchImg();

  formSearch.reset();
};

function clearImgGallery() {
  imgGallery.innerHTML = '';
}

formSearch.addEventListener('submit', searchImg);
loadMoreBtn.addEventListener('click', fetchImg);
