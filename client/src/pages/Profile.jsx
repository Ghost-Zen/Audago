import React from 'react';
import { Icon, Button, Message, Card, Image, Menu, Grid, Header, Divider, Container } from 'semantic-ui-react';
import { USERS_PLAYLIST } from '../api/typedefs';
import { Query } from 'react-apollo';
import SongList from '../components/songlist';
import Auth from '../utils/Auth'


export default class Profile extends React.Component {
    state = {
        activeItem: 'Playlists',
        showSongs: false,
        playlistChoice: ''
    };

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    }

    reset = () => {
        this.setState({
            showSongs: false,
            playlistChoice: ''
        });
    }

    playlistDisplay = () => (
        <Query query={USERS_PLAYLIST} variables={{ username: Auth.getUserName() }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                let playlistCards = [];
                let response;
                let index = 0;
                if (this.state.showSongs) {
                    return (
                        <Grid.Row>
                            <Grid.Column>
                                <Button onClick={this.reset} floated='left' icon>
                                    <Icon name='angle left' />
                                </Button>
                                <Header floated='left' as='h2'>
                                    {this.state.playlistChoice}
                                </Header>
                                <br />
                                <br />
                                <br />
                                <SongList
                                    data={data.playlistsForUser.playlists}
                                    choice={this.state.playlistChoice}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    )
                } else if (data.playlistsForUser.playlists) {
                    for (const playlist of data.playlistsForUser.playlists) {
                        let followerString = 'followers: ' + playlist.followers;
                        let songString = 'songs: ' + playlist.song_count;
                        playlistCards.push(
                            <Card
                                color='teal'
                                header={playlist.name}
                                meta={followerString}
                                description={songString}
                                key={index}
                                onClick={() => { this.displaySongs(playlist.name) }}
                            />
                        )
                        index++;
                    }
                    response = (
                        <Container>
                            <Grid.Row width={16}>
                                <Card.Group itemsPerRow={3}>
                                    {playlistCards}
                                </Card.Group>
                            </Grid.Row>
                        </Container>);
                } else {
                    response = (
                        <Message
                            icon='info circle'
                            warning
                            header='No playlists'
                            content={data.playlistsForUser.response}
                        />)
                }
                return response;
            }}
        </Query>
    );

    displaySongs = (value) => {
        this.setState({
            showSongs: true,
            playlistChoice: value
        });
    }

    renderItem = () => {
        if (this.state.activeItem === 'Playlists') {
            return (
                this.playlistDisplay()
            )
        } else if (this.state.activeItem === 'Settings') {
            return (
                <Header as='h4'>
                    Settings
                </Header>
            )
        }
    };

    render() {
        let username = Auth.getUserName();
        return (
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
                        <Menu pointing secondary>
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
                <Grid columns={0} divided container>
                    {this.renderItem()}
                </Grid>
            </Grid>
        )
    }

}