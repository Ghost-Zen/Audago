import React from 'react';
import { Image, Menu, Grid, Header, Divider, Container } from 'semantic-ui-react';
import Settings from '../components/editSettings';
import PlaylistDisplay from '../components/playlistDisplay';
import Auth from '../utils/Auth';
import Navbar from '../components/navbar';


export default class Profile extends React.Component {
    state = {
        activeItem: 'Playlists'
    };

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    }

    renderItem = () => {
        if (this.state.activeItem === 'Playlists') {
            return (
                <PlaylistDisplay />
            )
        } else if (this.state.activeItem === 'Settings') {
            return (
                <Settings />
            )
        }
    };

    render() {
        let username = Auth.getUserName();
        return (
            <div style={{backgroundColor:'black'}}>
                <Navbar />
                <Container>
                    <Grid>
                        <Grid.Row style={{ paddingBottom: 0 }}>
                            <Grid.Column width={16}>
                                <Divider />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row color='teal' style={{ marginTop: 15 }}>
                            <Grid.Column width={3}>
                                <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' />
                            </Grid.Column>
                            <Grid.Column width={13}>
                                <Header as='h2' inverted floated='left'>
                                    {username}
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Menu pointing secondary inverted>
                                    <Menu.Item
                                        name='Playlists'
                                        active={this.state.activeItem === 'Playlists'}
                                        onClick={this.handleItemClick}
                                    >
                                    </Menu.Item>
                                    <Menu.Item
                                        name='Settings'
                                        active={this.state.activeItem === 'Settings'}
                                        onClick={this.handleItemClick}
                                    >
                                    </Menu.Item>
                                </Menu>
                            </Grid.Column>
                        </Grid.Row>
                        {this.renderItem()}
                    </Grid>
                </Container>
            </div>
        )
    }

}