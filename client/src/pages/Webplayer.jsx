import React from 'react';
import  '../styling/App.css';
import { Container,Button, Form, Grid, Header, Image, Item, Segment, Label } from 'semantic-ui-react';

import { Mutation } from 'react-apollo'
export default class Webplayer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    song_data:props.data
  }
}

    renderData = () => {
        let {song_data} = this.state
        const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        let songTiles = [];
        for(let z = 0; z < song_data.length;z++){
        songTiles.push(
        <Item>
          <Item.Image src={song_data[z].artwork} />
    
          <Item.Content>
            <Item.Header as='a'>{song_data[z].track}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{song_data[z].artist}</span>
            </Item.Meta>
            <Item.Description>
                <audio controls className="audioplayer">
                <source src={song_data[z].song} />
                    </audio>
            </Item.Description>
            <Item.Extra>
          <Label icon='music' content='Apple Itunes' />
        </Item.Extra>           
          </Item.Content>
        </Item>
        )
        }
        return songTiles
    }

  render() {
    return(
        <div>
              <Container style={{ margin: 20 }}>
            <Item.Group divided>
            {this.renderData()}
            </Item.Group>
            </Container>
        </div>
    )
  }

}