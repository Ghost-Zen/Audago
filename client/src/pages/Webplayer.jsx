import React from 'react';
import '../styling/App.css';
import { Container, Card, Grid } from 'semantic-ui-react';
import Cards from '../components/card';
import AudioPlayer from '../components/player';
import SidebarA from '../components/sidebar';
import OnChangeSearch from '../components/onChangeSearch';
import Playlists from '../components/webplayerPlaylists';
import { Redirect } from 'react-router-dom'
export default class Webplayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_Tab:''
    }
  }

  playTrack = (track) => {
    let song_data = this.props.location.state.data.searchSong
    let x = document.querySelector("#player");
    x.src = song_data[track].song
    x.play();
  }

  renderTab = (tab) => {
    if(tab === undefined) tab = 'home'
    if(tab === 'home') return this.renderData()
    if(tab === 'playlist') return <Playlists />
    if(tab === 'manage_playlist') return <Redirect to='/profile'/>
  }

  setTab = (tab) => {
      this.setState({current_Tab:tab})
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
      return <Card.Group centered itemsPerRow={6}>{songTiles}</Card.Group>
    }
  }

  render() {
    let { current_Tab } = this.state
    return (
      <div className='webplayer'>
        <SidebarA setTab={this.setTab}/>
        <div className="cardContainer">
          <Grid >
            <Grid.Row centered><OnChangeSearch switchTab={() => this.setTab('home')} /></Grid.Row>
          </Grid>
          <Container style={{ margin: 15 }}>
          {this.renderTab(current_Tab)}
          </Container>
        </div>
        <AudioPlayer />
      </div>
    )
  }


}
