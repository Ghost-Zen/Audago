import axios from 'axios'

export default class SearchSong {

    getFromItunesAPI = async (e) => {
        let allSongsByArtist = [];
         await axios
          .get('https://itunes.apple.com/search?term='+e.search)
          .then(function (response) {
          let data = response.data.results
          for(let item of data){
            if(item.kind === 'song'){
                allSongsByArtist.push(item.trackName)
            }
          }
          console.log(allSongsByArtist)  
        });
      }
}