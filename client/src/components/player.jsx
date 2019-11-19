import React from 'react';
import ReactJkMusicPlayer from "../lib/react-jinke-music-player";
import "../lib/react-jinke-music-player/assets/index.css";

export default class Player extends React.Component{
  state={
    lastSongAdded:''
  }
  playSong = (e,f,g) => {
    console.log(e, f, g)
      let lastSongAdded = f.length
        this.setState({lastSongAdded})
  }

    render(){
      let { source } = this.props
      let { lastSongAdded } = this.state
      const options = source
        return(
<ReactJkMusicPlayer {...options}
glassBg={false}
autoPlay={true}
playIndex={lastSongAdded}
mode='full'
onAudioListsChange={this.playSong}
/>
        )
  }
}
