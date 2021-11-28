import SimpleLightbox from 'simplelightbox';
export { renderGallery } 

const gallery = document.querySelector('.gallery');

function renderGallery(responsedData) {

        const markup = responsedData.data.hits.map(({ webformatURL, tags, likes, views, comments, downloads, largeImageURL }) => {
        
            return `<a class="gallery-link" href="${largeImageURL}">
            <div class="photo-card">
            <img class="photo-card_img"   src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b><br>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b><br>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b><br>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b><br>
                ${downloads}
              </p>
            </div>
          </div>
          </a>`
        }).join('');

        gallery.insertAdjacentHTML('beforeend', markup);   
        const lightbox = new SimpleLightbox('.gallery a', { captionsData:'alt', captionDelay:250 });
        lightbox.refresh()
        }


