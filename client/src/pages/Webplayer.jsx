import React from 'react';
import '../styling/App.css';
import { Redirect } from 'react-router-dom';
import { Container, Card } from 'semantic-ui-react';
import Cards from '../components/card';
export default class Webplayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTrack: ''
    }
  }

  playTrack = (track) => {
    let song_data = this.props.location.state.data
    let x = document.querySelector("#player");
    x.src = song_data[track].song
    x.play();
  }

  stopActiveTrack = () => {

  }

  renderData = () => {
    let song_data = this.props.location.state.data
    let songTiles = [];
    for (let z = 0; z < song_data.length; z++) {
      songTiles.push(
        <div className="cardDiv">
          <Cards image={song_data[z].artwork}
            artist={song_data[z].artist}
            track={song_data[z].track}
            song={song_data[z].song}
            playTrack={this.playTrack}
            index={z}
          /><br />
          <strong>{song_data[z].track}</strong>
        </div>
      )
    }
    return songTiles
    {/* <Button>View</Button> */}
  }

  render() {
    if (this.props.location.state === undefined) {
      return <Redirect to="/" />
    } else {
      return (
        <div className="cardContainer">
          <Container style={{ margin: 15 }}>
            <Card.Group centered itemsPerRow={6}>
              {this.renderData()}
            </Card.Group>
          </Container>
          <div className="audioPlayer">
            <audio id="player" controls>
              <source src="" />
            </audio>
          </div>
        </div>
      )
    }
  }

}