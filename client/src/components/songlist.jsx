import React, { Component } from 'react'
import { List, Image } from 'semantic-ui-react'

export default class songlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    return (
          <List divided relaxed>
            <List.Item>
              <Image floated='left' avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
              <List.Content>
                Daniel Louise
              </List.Content>
            </List.Item>
            <List.Item>
              <Image avatar src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
              <List.Content>
                Stevie Feliciano
              </List.Content>
            </List.Item>
            <List.Item>
              <Image avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
              <List.Content>
                Elliot Fu
              </List.Content>
            </List.Item>
          </List>
    )
  }
}