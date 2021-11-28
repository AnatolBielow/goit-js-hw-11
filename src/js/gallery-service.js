import axios from "axios";

const API_KEY = '24487864-7b2c5952ffc1a40da1f65d382';
const URL = "https://pixabay.com/api/";

export default class GalleryApiService {
    constructor () {
    this.searchQuery = '';
    this.page = 1;
    }


async fetchGallery() {
const getGallery =   
await axios.get(URL, {
        params: 
        {   key: API_KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: 40,
            page: this.page,          
    }
})
        return getGallery;
}        
incrementPage() {
    this.page +=1;
}
  
resetPage() {
    this.page = 1;
}

}