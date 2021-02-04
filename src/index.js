import './styles.css';
import cardsImgsTpl from './temlates/image-card.hbs';
import ImageApiService from './temlates/apiService';
import LoadMoreAnimation from './temlates/load-more-btn';
// import animateScrollTo from 'animated-scroll-to';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const formSearch  = document.querySelector('#search-form');
const cardsContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');

const imageApiService = new ImageApiService();
const loadMoreAnimation = new LoadMoreAnimation({
  selector: '[data-action="load-more"]',
  hidden: true,
});

formSearch.addEventListener('submit', onSerarch);
loadMoreBtn.addEventListener('click', onloadMore)

function onSerarch(event) {
  event.preventDefault();
  imageApiService.query = event.currentTarget.elements.query.value;
  loadMoreAnimation.disable();
  loadMoreAnimation.show();
   if (imageApiService.query === '') {
    return info({
      text: 'please, enter any request',
      delay: 1500,
      closerHover: true,
    });
  }
  loadMoreAnimation.enable();
  imageApiService.resetPage();
  clearCardsContainer();
  fetchImgs();
}

function fetchImgs() {
   return imageApiService.fetchCards().then(images => {
    appendCardsMarkup(images);
    if (images.length === 0) {
      error({
        text: 'No matches found, please try another request',
        delay: 1500,
        closerHover: true,
      });
    }
  });
}

function appendCardsMarkup(images) {
  cardsContainer.insertAdjacentHTML('beforeend', cardsImgsTpl(images));
}

function clearCardsContainer() {
  cardsContainer.innerHTML = '';
}

function onloadMore() {
   loadMoreAnimation.disable();
   fetchImgs()
    .then(
      setTimeout(() => {
        window.scrollBy({
          top: document.documentElement.clientHeight - 100,
          behavior: 'smooth',
        });
      }, 1500),
    )
    .catch(error => console.log(error));
  loadMoreAnimation.enable();
}
