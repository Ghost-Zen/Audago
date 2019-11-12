import React from 'react';

export default class AudioPlayer extends React.Component{
    render(){
        return(
            <div className="audioPlayer">
            <audio id="player" controls>
              <source src="" />
            </audio>
          </div>
        )
    }
}