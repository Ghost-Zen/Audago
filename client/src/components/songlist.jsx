import React, { Component } from 'react'
import { Header, Button, List, Image, Icon } from 'semantic-ui-react'

export default class songlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
              <Image floated='left' style={{ height: 100, width: 100 }} src={song.artwork} />
              <List.Header>
                {song.track}
              </List.Header>
              <List.Description>{song.artist}</List.Description>
              <List.Description>{song.album}</List.Description>
              <Button onClick={() => this.playTrack(song.song)} style={{ marginTop: 10 }} icon>
                <Icon name='play' />
              </Button>
            </List.Item>
          )
          index++;
        }
      }
    }
    return listItems;
  }

  render() {
    return (
      <div>

        <Header floated='left' as='h2'>
          {this.props.choice}
        </Header>
        <br/>
        <br/>
        <br/>
        <List divided relaxed>
          {this.buildList()}
        </List>
        <div className="audioPlayer">
          <audio id="player" controls>
            <source src="" />
          </audio>
        </div>
      </div>
    )
  }
}