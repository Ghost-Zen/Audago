import axios from 'axios'

export default class SearchSong {

    getFromItunesAPI = async (e) => {
        let allSongsBySearch = [];
         await axios
          .get(`https://itunes.apple.com/search?term=${e.search}&entity=song`)
          .then(function (response) {
          let data = response.data.results
          for(let item of data){
            let search = {
              artist: item.artistName,
              track: item.trackCensoredName,
              song: item.previewUrl,
              album: item.collectionCensoredName,
              artwork: item.artworkUrl100
            }
              allSongsBySearch.push(search)
          }
        });
          return allSongsBySearch
      }
}