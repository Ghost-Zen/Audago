import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { Mutation, Query } from '@apollo/react-components';
import { USERS_PLAYLIST,NEW_TRACK } from '../api/queries';
import Auth from '../utils/Auth';

export default class PlaylistPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      playlist:''
    }
  }

  closeModal = () => {
    this.setState({
      open: false
    })
    this.props.reset()
  }

  openModal = () => {
    this.setState({
      open: true
    })
  }

  setPlaylist = (event) => {
    let playlist = event.target.name
    let { song } = this.props
    let song_proto = {
      track: song.track,
      artist: song.artist,
      album: song.album,
      song: song.song,
      artwork: song.artwork,
      playlist_name: playlist
    }
    this.setState({song_proto})
  }

  getPlaylist = (playlists) => {
    let allPlaylists = [];
    for (let z of playlists) {
      allPlaylists.push(<button name={z.name} onClick={this.setPlaylist}>{z.name}</button>)
    }
    return allPlaylists;
  }

  render() {
    let { open } = this.props
    let { song_proto } = this.state
    return (
      <Modal trigger={<Button onClick={this.openModal} icon="add"></Button>} basic size='small' open={open}>
        <Header icon='archive' content='Archive Old Messages' />
        <Modal.Content>

          <Query query={USERS_PLAYLIST} variables={{ username: Auth.getUserName() }}>
            {({ loading, error, data }) => {
              if(loading) return 'loading...'
              return (
                  <div>
                    {this.getPlaylist(data.playlistsForUser.playlists)}
                  </div>
                )
            }
            }
          </Query>

        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={this.closeModal}>
            <Icon name='remove' /> No
      </Button>
      <Mutation mutation={NEW_TRACK} variables={{ username:Auth.getUserName(),track:song_proto }}
                update={(cache, { data }) => {
                  console.log(`response:${data}`)
                }
                }
              >
                 {addToPlaylist => (
          <Button color='green' onClick={addToPlaylist} inverted>
            <Icon name='checkmark' /> Add
      </Button>
                 )}
      </Mutation>
        </Modal.Actions>
      </Modal>
    )
  }
}