import React, { Component } from 'react'
import { List, Image } from 'semantic-ui-react'

export default class songlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
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