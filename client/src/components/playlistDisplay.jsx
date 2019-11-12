import React from 'react';
import { Icon, Button, Message, Card, Grid, Container, Modal, Input, Header } from 'semantic-ui-react';
import { USERS_PLAYLIST, NEW_PLAYLIST } from '../api/queries';
import { Query, Mutation } from 'react-apollo';
import SongList from '../components/songlist';
import Auth from '../utils/Auth';

export default class PlaylistDisplay extends React.Component {
    state = {
        username: Auth.getUserName(),
        showSongs: false,
        playlistChoice: '',
        modalOpen: false,
        editSettings: false,
        modalError: false,
        response: '',
        playlistName: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => {
        this.setState({
            modalOpen: false,
            modalError: false,
            playlistName: ''
        })
    }

    handleModalError = () => {
        if (this.state.modalError && this.state.response) {
            return (
                <Message style={{ margin: 0 }} negative>
                    <Message.Header>{this.state.response}</Message.Header>
                </Message>
            )
        }
    }

    handleCheck = (res) => {
        if (res.newPlaylist.status) {
            this.setState({
                modalOpen: false,
                modalError: false
            })
        } else {
            this.setState({
                modalError: true,
                response: res.newPlaylist.response
            })
        }
    }

    displaySongs = (value) => {
        this.setState({
            showSongs: true,
            playlistChoice: value
        });
    }

    reset = () => {
        this.setState({
            showSongs: false,
            playlistChoice: ''
        });
    }

    render() {
        return (
            <Query query={USERS_PLAYLIST} variables={{ username: Auth.getUserName() }} pollInterval={500}>
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
                                    <SongList
                                        data={data.playlistsForUser.playlists}
                                        choice={this.state.playlistChoice}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        )
                    } else {
                        if (data.playlistsForUser.playlists) {
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
                        }
                        response = (
                            <Container>
                                <Grid.Row width={16}>
                                    <Card.Group itemsPerRow={3}>
                                        {playlistCards}
                                        <Modal
                                            trigger={
                                                <Card onClick={this.handleOpen} color='teal' key='create'>
                                                    <Card.Content>
                                                        <Button style={{ width: 50, height: 50 }} circular icon='add' />
                                                    </Card.Content>
                                                </Card>}
                                            open={this.state.modalOpen}
                                            basic
                                            onClose={this.handleClose}
                                            size='mini'
                                        >
                                            <Header icon='music' content='Give your playlist a name' />
                                            <Modal.Content>
                                                <Input transparent inverted placeholder='Playlist name..' name='playlistName' type='text' onChange={this.handleChange}></Input>
                                            </Modal.Content>
                                            {this.handleModalError()}
                                            <Modal.Actions>
                                                <Button color='red' onClick={this.handleClose} inverted>
                                                    <Icon name='cancel' /> Cancel
                                                </Button>
                                                <Mutation mutation={NEW_PLAYLIST} variables={{ name: this.state.playlistName, creator: this.state.username }}
                                                    update={(cache, { data }) => {
                                                        let res = data;
                                                        this.handleCheck(res);
                                                    }
                                                    }
                                                >
                                                    {newPlaylist => (
                                                        <Button color='green' onClick={newPlaylist} inverted>
                                                            <Icon name='check' /> Create
                                                        </Button>
                                                    )}
                                                </Mutation>
                                            </Modal.Actions>
                                        </Modal>
                                    </Card.Group>
                                </Grid.Row>
                            </Container>);
                    }
                    return response;
                }}
            </Query>

        )
    }

}