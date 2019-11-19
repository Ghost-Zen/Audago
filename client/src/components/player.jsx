import React from 'react';

export default class Player extends React.Component{
    render(){
      let { source } = this.props
        return(
            <div className="audioPlayer">
            <audio id="player" controls>
              <source src="" />
            </audio>
            </div>
        )
    }
}
