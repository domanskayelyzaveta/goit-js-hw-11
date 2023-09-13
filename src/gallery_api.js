import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// axios.defaults.headers.common["x-api-key"] = "39407568-0a070d3ffff032a43909d6f38";

////запити///

export class PixabayApiFetch {
  static baseUrl = "https://pixabay.com/api/";
  static apiKey = "39407568-0a070d3ffff032a43909d6f38";
  static url = `${PixabayApiFetch.baseUrl}?key=${PixabayApiFetch.apiKey}`;

  constructor() {
    this.q = null;
    this.page = 1;
  }

  fetchByTag(tag) {
    const PARAMS = new URLSearchParams({
      q: tag,
      page: this.page,
      per_page: 20,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
    });

    const url = `${PixabayApiFetch.url}&${PARAMS}`;

    return axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        Notify.failure(error);
      });
  }

  fetchRandomPhotos() {
    const axiosOptions = {
      params: {
        per_page: 20,
        orientation: "horizontal",
        key: PixabayApiFetch.apiKey,
      },
    };

    return axios.get(`${PixabayApiFetch.baseUrl}/photos/random`, axiosOptions);
  }
}


