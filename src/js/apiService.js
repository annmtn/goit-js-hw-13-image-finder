import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = "23680047-d9031fffdd651876adcb86e81"

export default class ApiService{
  constructor(){
    this.searchQuery = "";
    this.page = 1;
    this.perPage = 12;
  }
  async fetchImg(){
    try {
      let response = await axios.get(
        `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${apiKey}`
      );
      let data = await response?.data?.hits;
      this.incrementPage()
      return data
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage(){
    this.page +=1;
  }
   
  resetPage(){
    this.page = 1
  }
  
  get query(){
    return this.searchQuery
  }

  set query(value){
    this.searchQuery = value
  }
}

