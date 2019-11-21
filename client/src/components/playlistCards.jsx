import React, { Component } from 'react'
import { Button, Dimmer, Image } from 'semantic-ui-react'
import Auth from '../utils/Auth'
import { FOLLOW_PLAYLIST, UNFOLLOW_PLAYLIST } from '../api/queries'
import { Mutation } from 'react-apollo';

export default class cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: Auth.getUserName(),
      playlist: this.props.playlist_meta.name
    }
  }

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  intialPlayer = (playlist) => {
    this.setState({ activePlaylist: playlist })
    let songList = [];
    for (const track of this.props.songs) {
      songList.push(track);
    }
    this.props.playTrack(songList, 0)
  }

  resetCard = () => {
    this.setState({
      active: false
    })
  }

  renderFollowButton = () => {
    let { username, playlist } = this.state;
    let follower_list = this.props.playlist_meta.follower_list
    if (follower_list.includes(Auth.getUserName())) {
      return (
        <Mutation mutation={UNFOLLOW_PLAYLIST} variables={{ username, playlistName: playlist }}>
          {unfollowPlaylist => (
            <Button icon="heart" color='red' onClick={unfollowPlaylist}></Button>
          )}
        </Mutation>
      )
    } else {
      return (
        <Mutation mutation={FOLLOW_PLAYLIST} variables={{ username, playlistName: playlist }}>
          {followPlaylist => (
            <Button icon="heart outline" color='red' onClick={followPlaylist}></Button>
          )}
        </Mutation>
      )
    }
  }

  render() {
    let { image, index } = this.props
    const { active } = this.state
    const content = (
      <div>
        <Button primary icon="play" onClick={() => this.intialPlayer(index)}></Button>
        {this.renderFollowButton()}
      </div>
    )

    return (
      <Dimmer.Dimmable
        as={Image}
        dimmed={active}
        dimmer={{ active, content }}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
        size='small'
        src={image}
      />
    )
  }
}
