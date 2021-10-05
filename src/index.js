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

  imageService.fetchImg().then(hits => {
    if (hits.length === 0) {
        Notify.warning('Ошибка ввода')
        button.hidden()
        return
    }

    imgGallery.insertAdjacentHTML('beforeend', imageCard(hits));

    button.show();
    button.enable();

    imgGallery.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
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
