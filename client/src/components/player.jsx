import React from 'react';
import ReactJkMusicPlayer from "../lib/react-jinke-music-player";
import "../lib/react-jinke-music-player/assets/index.css";

export default class Player extends React.Component{
  state={
    lastSongAdded:0
  }
  playSong = (e,f,g) => {
      let lastSongAdded = f.length - 1
        this.setState({lastSongAdded})
  }

    render(){
      let { source } = this.props
      let { lastSongAdded } = this.state
      const options = {
            audioLists: [
                      {
      name: source.track,
      singer: source.artist,
      cover: source.artwork,
      musicSrc: () => {
        return Promise.resolve(
          source.song
        )
      }
    }]
}
if(source !== ''){
        return(
<ReactJkMusicPlayer {...options}
autoPlay={true}
glassBg={false}
playIndex={lastSongAdded}
mode='full'
onAudioListsChange={this.playSong}
/>
        )
    }else{
      return <div></div>
    }
  }
}
