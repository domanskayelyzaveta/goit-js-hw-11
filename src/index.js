import { PixabayApiFetch } from "./gallery_api";
import InfiniteScroll from 'infinite-scroll';
import { Notify } from "notiflix";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    formEl: document.querySelector(".search-form"),
    galleryEl: document.querySelector(".gallery"),
    loadBtn: document.querySelector(".load-btn"),
};


refs.loadBtn.classList.add("is-hidden");

const lightbox = new SimpleLightbox('.gallery a');
const pixabayApiFetch = new PixabayApiFetch();
let page = 1;



///////////////SCROLL////////////////

// const infScroll = new InfiniteScroll(refs.galleryEl, {
//   path: function () {
//     return `/path-to-next-page?page=${page}`;
//   },
//   append: '.photo-card',
//   checkLastPage: true, 
//   history: false,
//   button: refs.loadMoreButton,
// });

// infScroll.on('load', function () {
//   page++;
//   pixabayApiFetch.page = page;
//   pixabayApiFetch.fetchByTag().then(data => {
//     createGalleryCard(data.hits);
//     infScroll.loadNextPage();
//   })
//   .catch(error => {
//     console.log(error);
//   });
// });

///////////////////////////////////////



export const createGalleryCard = (photosArr) => {
  const markUp = photosArr.map((photo) => {
    return `
   <div class="photo-card">
        <a href="${photo.largeImageURL}" data-lightbox="gallery">
          <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" class="photo-el" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes:</b> ${photo.likes}
          </p>
          <p class="info-item">
            <b>Views:</b> ${photo.views}
          </p>
          <p class="info-item">
            <b>Comments:</b> ${photo.comments}
          </p>
          <p class="info-item">
            <b>Downloads:</b> ${photo.downloads}
          </p>
        </div>
      </div>
    `;
  });
    
    refs.galleryEl.insertAdjacentHTML("beforeend", markUp.join(" ")); 
    lightbox.refresh();
};



refs.formEl.addEventListener('submit', async event => {
    event.preventDefault();
    pixabayApiFetch.q = refs.formEl.elements.searchQuery.value.trim();
   refs.loadBtn.classList.remove("is-hidden");


    if (pixabayApiFetch.q === "") {
        page = 1;
        alert("Please write some text");
        return;
    }

     
    refs.galleryEl.innerHTML = "";
    try {
        const data = await pixabayApiFetch.fetchByTag()
        if (data.totalHits < 40) {
            refs.loadBtn.classList.add("is-hidden");
        }


        createGalleryCard(data.hits);
        event.target.reset();
    } catch(error) {
        console.log(error);
        }
});



refs.loadBtn.addEventListener('click', async event => {

    try {
        pixabayApiFetch.page += 1;
        const data = await pixabayApiFetch.fetchByTag();
        createGalleryCard(data.hits);

        if (Math.ceil(data.totalHits/40) < pixabayApiFetch.page) {
            refs.loadBtn.classList.add("is-hidden");
            Notify.info("We're sorry, but you've reached the end of search results.");
        }
    } catch (error) {
        console.log(error);
    }
});

