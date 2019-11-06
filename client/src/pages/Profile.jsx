import React from 'react';
import { Image, Menu, Grid, Header, Divider } from 'semantic-ui-react';


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
                <Header as='h4'>
                    Playlists
                </Header>
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
        return (
            <Grid>
                <Grid.Row style={{ paddingBottom: 0 }}>
                    <Grid.Column width={16}>
                        <Divider />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ marginTop: 15 }}>
                    <Grid.Column width={3}>
                        <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' />
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Header as='h2' color='teal' floated='left'>
                            Username
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
                {this.renderItem()}
            </Grid>
        )
    }

}