import React from 'react';
import  '../styling/App.css';
import { Redirect } from 'react-router-dom';
import { Container,Card } from 'semantic-ui-react';
import Cards from '../components/card';

export default class Webplayer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeTrack:''
    }
}



  stopActiveTrack = () => {

  }

    renderData = () => {
        let song_data = this.props.location.state.data
        let songTiles = [];
        for(let z = 0; z < song_data.length;z++){
        songTiles.push(
          <Cards image={song_data[z].artwork}
                 artist={song_data[z].artist}
                 track={song_data[z].track}
                 song={song_data[z].song}
                 index={z}
          />
          )
        }
        return songTiles
    }

  render() {
    if(this.props.location.state === undefined){
      return <Redirect to="/" />
    }else{
    return(
        <div>
              <Container style={{ margin: 20 }}>
              <Card.Group itemsPerRow={6}>
            {this.renderData()}
            </Card.Group>
            </Container>
        </div>
    )
  }
}

}