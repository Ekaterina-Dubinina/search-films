import {
  addMovieToList,
  createStyle,
  createMarkup,
  inputSearch,
  movieList,
  triggerMode,
  clearMoviesMarkup
} from './dom.js';

let siteUrl = null;
let searchLast = null;

const getData = (url) => fetch(url)
  .then((res) => res.json())
  .then((json) => {
    if (!json || !json.Search) throw Error('Сервер вернул неправильный объект');
    return json.Search;
  });
  
  const debounce = (() => {
    let timer = null;

    return (cb, ms) => {
      if (timer !== null) clearTimeout(timer)
      timer = setTimeout(cb, ms);
    };
  })();

  const inputSearchHandler = (e) => {

    debounce(() => {
      const searchString = e.target.value.trim();

      if (searchString && searchString.length > 3 && searchString !== searchLast) {
 
        if (!triggerMode) clearMoviesMarkup(movieList);

        getData(`${siteUrl}?apikey=18b8609f&s=${searchString}`)
        .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
        .catch((err) => console.log(err));

        searchLast = searchString.trim();
      }
    }, 2000);
  };


  export const appInit = (url) => {
    createMarkup();
    createStyle();
    siteUrl = url;

    inputSearch.addEventListener('keyup', inputSearchHandler);
  }
