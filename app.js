const movieData = {

  async getAPIDATA(){
    // const res = await fetch(url)
    // const data = await res.json();
    // console.log(data.results);

    const api_key = "ecb6d664e6f62f5669b12ec6bdcfaac0";
    const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;

    const result = await fetch(api_url);
    const data = await result.json();
    const {results} = data;
    return results;

    
  },
  async searchMovies(){

    const searchInput = document.getElementById('searchInput');
    const api_key = "ecb6d664e6f62f5669b12ec6bdcfaac0";
    const searchKeyword = searchInput.value;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchKeyword}`;

    console.log('Searching..')
    const searchResult = await fetch(searchUrl);
    const searchData = await searchResult.json();
    const {results} = searchData;
    return results;
    
  }
}

const UI = {
  selectors(){

  },
  printToUI(data){
    const movieList = document.getElementById('movieList');
    const IMG_URL = `https://image.tmdb.org/t/p/w500`;

    data.forEach(movie => {
      const {original_title, poster_path, vote_average, original_language, id} = movie;
      const element = document.createElement('div');
      element.className = "col-md-3 mb-3";
      element.id = id;
      element.innerHTML = 
      `<div class="card">
          <img src="${IMG_URL+poster_path}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${original_title}</h5>
            <p class="card-text">Rating: ${vote_average}</p>
            <p class="card-text">Language: ${original_language}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>`;
        movieList.appendChild(element);
      });
  },
  init(){
    document.addEventListener('DOMContentLoaded', async (e) => {
      const allData = await movieData.getAPIDATA();
      this.printToUI(allData)
    });
    document.querySelector('.searchBtn').addEventListener('click', async (e) => {
      e.preventDefault();
      const movieList = document.getElementById('movieList');
      movieList.innerHTML = '';
      const allData = await movieData.searchMovies();
      this.printToUI(allData);
    });
  }
}

UI.init();


