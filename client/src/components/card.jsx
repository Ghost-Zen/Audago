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

  intialPlayer = (track) => {
    this.setState({activeTrack:track})
    this.props.playTrack(track)
  }

  render() {
    let {image,index} = this.props
    const { active } = this.state
    const content = (
      <div>
        {/* <Header as='h4' inverted>
          {track}
        </Header> */}

        <Button primary icon="play" onClick={() => this.intialPlayer(index)}></Button>
        {/* <Button>View</Button> */}
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