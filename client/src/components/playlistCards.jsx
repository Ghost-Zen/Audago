import React, { Component } from 'react'
import { Button, Dimmer, Image } from 'semantic-ui-react'
export default class cards extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  intialPlayer = (playlist) => {
    this.setState({activePlaylist:playlist})
    this.props.playTrack(this.props.songs, 0)
  }

  resetCard = () => {
    this.setState({
      active:false
    })
  }

  render() {
    let {image,index} = this.props
    const { active } = this.state
    const content = (
      <div>
        <Button primary icon="play" onClick={() => this.intialPlayer(index)}></Button>
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