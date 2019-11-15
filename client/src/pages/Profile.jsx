import React from 'react';
import { Image, Menu, Grid, Header, Divider, Container, Label } from 'semantic-ui-react';
import Settings from '../components/editSettings';
import PlaylistDisplay from '../components/profilePlaylist';
import { USER_DATA } from '../api/queries';
import { Query } from 'react-apollo';
import Auth from '../utils/Auth';
import Navbar from '../components/navbar';


export default class Profile extends React.Component {
    state = {
        activeItem: 'Playlists'
    };

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    }

    renderBannerInfo = () => (
        <Query query={USER_DATA} variables={{ username: Auth.getUserName() }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                return (
                    <Header as='h1' style={{marginTop: 0.8 + 'em'}} inverted floated='left'>
                        Hello,  {Auth.getUserName()} <br />
                        <Label as='a' color='purple' image>
                            Joined
                    <Label.Detail>{data.userData.user.timeStamp.created}</Label.Detail>
                        </Label>
                    </Header>
                )
            }}
        </Query>
    )

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
        return (
            <div className="profile" style={{backgroundColor:'black'}}>
                <Navbar />
                <Container>
                    <Grid>
                        <Grid.Row style={{ paddingBottom: 0 }}>
                            <Grid.Column width={16}>
                                <Divider />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row color='teal' style={{ marginTop: 15, borderRadius:10 }}>
                            <Grid.Column width={2}>
                                <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' />
                            </Grid.Column>
                            <Grid.Column width={13}>
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