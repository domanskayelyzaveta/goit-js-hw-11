import { PixabayApiFetch } from "./gallery_api";


const refs = {
formEl: document.querySelector(".search-form"),
}


const pixabayApiFetch = new PixabayApiFetch();

pixabayApiFetch.fetchByTag().then(data => { console.log(data);
})
.catch (error => {
    console.log(error);
});




refs.formEl.addEventListener('submit', event => {
    event.preventDefault();
    pixabayApiFetch.fetchCatByTag().then(data => {
        console.log(data);
    })
        .catch(error => {
            console.log(error)
        });
});

const createGallery = (photosArr) => {
    const markUp = photosArr.map((photo) => {
        return `<li class="gallery-item">
        <img src="${photo.url}" alt="${photo.description}" />
      </li>`;
    })
};

