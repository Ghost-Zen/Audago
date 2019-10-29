import axios from 'axios'

export default class SearchSong {

    getFromItunesAPI = async (e) => {
        let allSongsBySearch = [];
         await axios
          .get(`https://itunes.apple.com/search?term=${e.search}&entity=song`)
          .then(function (response) {
          let data = response.data.results
          for(let item of data){
            // if(item.kind === 'song'){
              allSongsBySearch.push(item)
            // }
          }
        });
        //  let result = allSongsBySearch)
          console.log(allSongsBySearch)
          return allSongsBySearch
      }
}