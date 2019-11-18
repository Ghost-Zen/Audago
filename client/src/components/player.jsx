import React from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

export default class Player extends React.Component{

  test = (e,f,g) => {
      console.log(e)
        console.log(f)
          console.log(g)
  }

    render(){
      let { source } = this.props
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
playIndex={0}
mode='full'
onAudioPlayTrackChange={this.test}
/>
        )
    }else{
      return <div></div>
    }
  }
}
