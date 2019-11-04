import React, { Component } from 'react'
import { Button, Dimmer, Header, Image } from 'semantic-ui-react'

export default class cards extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  playTrack = (track) => {
    // this.stopActiveTrack()
    console.log('test')
    this.setState({activeTrack:track})
    let audio = new Audio(this.props.song);
    audio.play();
  }

  render() {
    let {image,track,index} = this.props
    const { active } = this.state
    const content = (
      <div>
        <Header as='h4' inverted>
          {track}
        </Header>

        <Button primary icon="play" onClick={() => this.playTrack(index)}></Button>
        {/* <Button>View</Button> */}
      </div>
    )

    return (
      <Dimmer.Dimmable
        style = {{margin:3}}
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