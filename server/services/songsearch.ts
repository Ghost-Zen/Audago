import axios from 'axios'

export default class SearchSong {

  getFromItunesAPI = async (e) => {
    let allSongsBySearch = [];
    await axios
      .get(`https://itunes.apple.com/search?term=${e.search}&entity=song`)
      .then(function (response) {
        let data = response.data.results
        for (let item of data) {
          let artwork = item.artworkUrl100
          artwork = artwork.split('/')
          let lastItemArray = artwork.length - 1;
          artwork[lastItemArray] = '200x200bb.jpg'; //make image quality better.
          artwork = artwork.join('/');
          let search = {
            artist: item.artistName,
            track: item.trackCensoredName,
            song: item.previewUrl,
            album: item.collectionCensoredName,
            artwork
          }
          if(search.track && search.artist && search.song && search.album && search.artwork){
            allSongsBySearch.push(search)
          } else {
          }
        }
      });
    return allSongsBySearch
  }
}
