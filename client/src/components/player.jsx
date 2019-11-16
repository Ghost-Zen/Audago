import React from 'react';
import AudioPlayer from "react-h5-audio-player";

export default class Player extends React.Component{
    render(){
      let { source } = this.props
        return(
            // <audio id="player" controls>
            //   <source src="" />
            // </audio>
            // </div>
            <div className="audioPlayer">
  <AudioPlayer
  autoPlay
  src={source}
  onPlay={e => console.log("onPlay")}
  // other props here
/>
</div>
        )
    }
}
