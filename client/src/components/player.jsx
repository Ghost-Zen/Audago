import React from 'react';
import ReactJkMusicPlayer from "../lib/react-jinke-music-player";
import "../lib/react-jinke-music-player/assets/index.css";

export default class Player extends React.Component{
  state={
    lastSongAdded:''
  }
  playSong = (e,f,g) => {
      let lastSongAdded = f.length
        this.setState({lastSongAdded})
  }

  changeObjKeys = (source) => {
    let tracks = [];
    for(let song of source){
      let newObj = {
        name: song.track,
        singer: song.artist,
        cover: song.artwork,
        musicSrc: () => {
             return Promise.resolve( song.song )
           }
      }
      tracks.push(newObj)
    }
    return tracks
  }

    render(){
      let { source } = this.props
      // let { lastSongAdded } = this.state
      const options = { audioLists: this.changeObjKeys(source) }
        return(
<ReactJkMusicPlayer {...options}
autoPlay={true}
remove={true}
showDownload={false}
showPlayMode={true}
showThemeSwitch={false}
mode='full'
onAudioListsChange={this.playSong}
/>
        )
  }
}
