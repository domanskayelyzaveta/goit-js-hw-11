import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';


const galleryCard = new SimpleLightbox('.gallery a');
// axios.defaults.headers.common["x-api-key"] = "39407568-0a070d3ffff032a43909d6f38";

////запити///

export class PixabayApiFetch {
  static url = "https://pixabay.com/api/";


  constructor() {
    this.q = null;
    this.page = 1;
  }

  async fetchByTag() {
      const PARAMS = new URLSearchParams({
      key: "39407568-0a070d3ffff032a43909d6f38",
      q: this.q,
      page: this.page,
      per_page: 40,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
    });
      
      
    const url = `${PixabayApiFetch.url}?${PARAMS}`;

      try {
          const response = await axios.get(url);
          return response.data;
      } catch (error) {
          Notify.failure(error);
      }
  }

};

