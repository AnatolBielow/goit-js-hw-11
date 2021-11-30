import './sass/main.scss';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';
import GalleryApiService from './js/gallery-service';
import { renderGallery } from './js/gallery-creator'

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.btn-load-more'),
  submitBth: document.querySelector('#submit')
}
const galleryApiService = new GalleryApiService;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.classList.add('is-hidden');
refs.loadMoreBtn.addEventListener('click', onLoadMore);


async function onSearch(evt) {
  
  evt.preventDefault();
  galleryApiService.searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
  refs.submitBth.setAttribute('disabled',true);

  refs.searchForm.addEventListener('input', evt => {
  refs.submitBth.removeAttribute('disabled')
  })

  clearGallery();
  
  const response = await galleryApiService.fetchGallery();
  const totalHits = response.data.totalHits;  
  const hitsLength = response.data.hits.length;  
    
    if(totalHits < 1) {
      
        Notify.failure("Sorry, there are no images found. Please try again.");
        galleryApiService.resetPage();
        clearGallery();
        return;
    }
      if (galleryApiService.searchQuery === '') {
    // Notify.info(`You have not entered any data. These are sample photos. Please specify your choice!`);
    // renderGallery(response)
        Notify.failure('You have not entered any data. Please specify your choice!')
        galleryApiService.resetPage();
        clearGallery();
        return;
      }
      else {
      Notify.success(`Hooray! We found ${totalHits} images.`);
      galleryApiService.resetPage();
      renderGallery(response)
      refs.loadMoreBtn.classList.remove('is-hidden');  
         
    }
    if (hitsLength < 40) {
      refs.loadMoreBtn.classList.add('is-hidden');  
}
}

async function onLoadMore() {
    
  galleryApiService.incrementPage();

  const response = await galleryApiService.fetchGallery();
  renderGallery(response) 
  const hitsLength = response.data.hits.length;  
  if (hitsLength < 40) {
      refs.loadMoreBtn.classList.add('is-hidden');
        Notify.info("We're sorry, but it's no more result!");
    }  

  const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
  top: cardHeight * 2 + 50,
  behavior: 'smooth',
});

}

  
function clearGallery() {
  refs.gallery.innerHTML = '';
}
