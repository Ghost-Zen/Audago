import React from 'react';
import '../styling/App.css';
import { Container, Card, Grid } from 'semantic-ui-react';
import Cards from '../components/card';
import AudioPlayer from '../components/player';
import SidebarA from '../components/sidebar';
import OnChangeSearch from '../components/onChangeSearch';
import Playlists from '../components/webplayerPlaylists';
export default class Webplayer extends React.Component {
  constructor(props) {
    super(props);
  }

  playTrack = (track) => {
    let song_data = this.props.location.state.data.searchSong
    let x = document.querySelector("#player");
    x.src = song_data[track].song
    x.play();
  }


  renderData = () => {
    if (this.props.location.state !== undefined) {
      let song_data = this.props.location.state.data.searchSong
      let songTiles = [];
      for (let z = 0; z < song_data.length; z++) {
        songTiles.push(
          <div key={z} className="cardDiv">
            <Cards
              image={song_data[z].artwork}
              artist={song_data[z].artist}
              track={song_data[z].track}
              song={song_data[z].song}
              playTrack={this.playTrack}
              song_meta={song_data[z]}
              index={z}
            /><br />
            <strong>{song_data[z].track}</strong>
          </div>
        )
      }
      return songTiles
    }
  }

  render() {
    return (
      <div className='webplayer'>
        <SidebarA />
        <div className="cardContainer">
          <Grid >
            <Grid.Row centered><OnChangeSearch /></Grid.Row>
          </Grid>
          <Container style={{ margin: 15 }}>
            <Playlists />
          </Container>
        </div>
        <AudioPlayer />
      </div>
    )
  }


}
