import React, { Component } from 'react'
import { Header, Button, List, Icon, Popup } from 'semantic-ui-react'
import { DELETE_TRACK } from '../api/queries';
import Auth from '../utils/Auth';
import { Query } from 'react-apollo';

export default class songlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: Auth.getUserName(),
      delete: false,
      trackInfo: {},
      open: false
    }
  }

  playTrack = (track) => {
    let songList = [];
    let startTrack;
    for (const playlist of this.props.data) {
      if (playlist.name === this.props.choice) {
        for (const song of playlist.songs) {
          songList.push(song.song);
        }
      }
    }
    startTrack = songList.indexOf(track);
    this.playSong(songList, startTrack);
  }

  async playSong(songList, startTrack) {
    if (!this.props.from) {
      let index = startTrack;
      let x = document.querySelector("#player");
      x.src = songList[index];
      index++;
      var playPromise = x.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          x.addEventListener('ended', async () => {
            if (index !== songList.length) {
              await this.playSong(songList, index);
            } else {
              await this.playSong(songList, 0);
            }
          });
        })
          .catch(error => {
          });
      }
    } else {
      this.props.playTrack(songList, startTrack);
    }
  }

  deleteTrack = (event) => {
    let trackInfo = { track: event.target.id, artist: '', playlist_name: this.props.choice }

    for (const playlist of this.props.data) {
      if (playlist.name === this.props.choice) {
        for (const song of playlist.songs) {
          if (song.track === trackInfo.track) {
            trackInfo.artist = song.artist
          }
        }
      }
    }
    this.setState({
      delete: true,
      trackInfo
    });
  }

  renderDelete = () => {
    if (this.state.delete) {
      return (
        <Query query={DELETE_TRACK} variables={{ username: this.state.username, trackInfo: this.state.trackInfo }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            console.log(data)
            return (
              <div>
                {this.buildList()}
              </div>
            )
          }}
        </Query>
      )
    }
  }

  renderDeleteState = () => {
    if (this.state.delete) {
      this.setState({
        delete: false
      });
    }
  }

  renderRemove = (song, creator) => {
    if (this.state.username === creator && !this.props.from) {
      return (
        <List.Content floated='right'>
          {this.renderDelete()}
          <Popup basic content='Remove from playlist' trigger={<Icon inverted id={song.track} ref={song.artist} onClick={this.deleteTrack} link name='remove' />} />
          {this.renderDeleteState()}
        </List.Content>
      )
    }
  }

  buildList = () => {
    let playlists = this.props.data;
    let listItems = [];
    let index = 0;
    for (const playlist of playlists) {
      if (playlist.name === this.props.choice) {
        let songs = playlist.songs;
        for (const song of songs) {

          listItems.push(
            <List.Item key={index}>
            <Button inverted floated='left' size='mini' onClick={() => this.playTrack(song.song)} style={{ marginTop: 10 }} icon>
              <Icon name='play'/>
            </Button>
              <List.Header>
                {song.track}
                  </List.Header>
              <List.Description>{song.artist} | {song.album}</List.Description>
              {this.renderRemove(song, playlist.creator)}

            </List.Item>
          )
          index++;
        }
      }
    }
    return listItems;
  }

  render() {
    let choice = this.props.choice;
    return (
      <div>
        <Button onClick={this.props.reset} floated='left' size='small' icon='angle left' />
        <Header centered='true' as='h2' inverted>
          {choice}
        </Header>
        <List celled relaxed inverted>
          {this.buildList()}
        </List>
      </div>
    )
  }
}
