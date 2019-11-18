import React, { Component } from 'react'
import { Button, Dimmer, Image } from 'semantic-ui-react'
import PlaylistPopup from './playlistPopup'
export default class cards extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  intialPlayer = (track) => {
    this.setState({activeTrack:track})
    this.props.playTrack(track)
  }

  resetCard = () => {
    this.setState({
      active:false
    })
  }

  render() {
    let {image,index,song_meta} = this.props
    const { active } = this.state
    const content = (
      <div>
        <Button primary icon="play" onClick={() => this.intialPlayer(index)}></Button>
        <PlaylistPopup song={song_meta} reset={this.resetCard}/>
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
