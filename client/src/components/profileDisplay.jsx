import React from 'react';
import { Image, Menu, Grid, Header, Container, Label, Button } from 'semantic-ui-react';
import Settings from '../components/editSettings';
import PlaylistDisplay from '../components/profilePlaylist';
import { USER_DATA } from '../api/queries';
import { Query } from 'react-apollo';
import Auth from '../utils/Auth';
import Friends from '../components/friends';
import moment from 'moment';
import axios from 'axios';

export default class ProfileDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'Playlists',
            loggedInUser: Auth.getUserName(),
            username: this.props.username
        }
    }
    
    changeProfileDisplay = (username) => {
        this.setState({
            username,
            activeItem: 'Playlists'
        });
    }

    renderBack = () => {
        this.setState({
            username: Auth.getUserName(),
            activeItem:'Friends'
        });
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    };

    setTab = (chosen_tab) => {
        this.setState({ activeItem: chosen_tab })
    }

    renderBackButton = () => {
        if (this.state.loggedInUser !== this.state.username) {
            return <Button onClick={this.renderBack} floated='left' size='small' icon='angle left' />
        }
    }

    profilePic = (username) => {
        const token = localStorage.getItem('sudo')
        const config = {
            headers: {
                authorization: token ? `Bearer:${token}` : '',
            },
            responseType: 'blob'
        };
        axios.post("/api/profile", {username},config)
        .then(response => {
            let image = URL.createObjectURL(response.data)
            let imgElem = document.querySelector('#profile')
            imgElem.src = image
          })
    }


    renderBannerInfo = () => {
        let { username } = this.state;
        this.profilePic(username)
        return (
            <Query query={USER_DATA} pollInterval={500} variables={{ username }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if (this.state.loggedInUser === username) {
                        return (
                            <Header as='h1' style={{ marginTop: 0.8 + 'em' }} inverted floated='left'>
                                Hello,  {username} <br />
                                <Label as='a' color='purple' image>
                                    Joined
                    <Label.Detail>{data.userData.user.timeStamp.created}</Label.Detail>
                                </Label>
                            </Header>
                        )
                    } else {
                        let lastOnline = data.userData.user.timeStamp.lastSeen;
                        return (
                            <Header as='h1' style={{ marginTop: 0.8 + 'em' }} inverted floated='left'>
                                {username} <br />
                                <Label as='a' color='purple' image>
                                    Joined
                                    <Label.Detail>{data.userData.user.timeStamp.created}</Label.Detail>
                                </Label>
                                <Header.Subheader>
                                    {this.renderLastOnline(lastOnline)}
                                </Header.Subheader>
                            </Header>
                        )
                    }
                }}
            </Query>
        )
    }

    renderLastOnline = (lastSeen) => {
        if (lastSeen === 'online') {
            return 'Online'
        } else {
            let lastOnline = moment(lastSeen).fromNow()
            return `Last online ${lastOnline}`;
        }
    }

    renderItem = () => {
        if (this.state.activeItem === 'Playlists') {
            return (
                <PlaylistDisplay username={this.state.username} />
            )
        } else if (this.state.activeItem === 'Settings') {
            return (
                <Settings username={this.state.username} />
            )
        } else if (this.state.activeItem === 'Friends') {
            return (
                <Friends show={this.changeProfileDisplay} username={this.state.username} />
            )
        }
    };

    renderSettings = () => {
        if (this.state.loggedInUser === this.state.username) {
            return (
                <Menu.Item
                    name='Settings'
                    active={this.state.activeItem === 'Settings'}
                    onClick={this.handleItemClick}
                >
                </Menu.Item>
            )
        }
    }


    renderFriends = () => {
        if (this.state.loggedInUser === this.state.username) {
            return (
                <Menu.Item
                    name='Friends'
                    active={this.state.activeItem === 'Friends'}
                    onClick={this.handleItemClick}
                >
                    Friends
          </Menu.Item>
            )
        }
    }

    render() {
        return (
            <div className="profile" style={{ backgroundColor: 'black' }}>
                <Container style={{ padding: 10 }}>
                    <Grid>
                        <Grid.Row style={{ paddingBottom: 0 }}>
                            <Grid.Column width={16}>
                            </Grid.Column>
                        </Grid.Row>
                        {this.renderBackButton()}
                        <Grid.Row color='teal' style={{ marginTop: 15, borderRadius: 10 }}>
                            <Grid.Column width={2}>
                                <Image id='profile' style={{ width: 100, height: 100 }} circular />
                            </Grid.Column>
                            <Grid.Column width={14}>
                                {this.renderBannerInfo()}
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
                                    {this.renderFriends()}
                                    {this.renderSettings()}
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
