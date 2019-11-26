import React from 'react'
import { Header, Dimmer, Image } from 'semantic-ui-react';

export default class ProfilePlaylistCards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlist: this.props.playlist,
            active: false
        }
    }

    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })

    render() {
        const { active, playlist } = this.state;
        let followerString = 'followers: ' + playlist.followers;
        let songString = 'songs: ' + playlist.song_count;
        let content = (
            <Header inverted>
                {playlist.name}
                <Header.Subheader>
                    {followerString}
                </Header.Subheader>
                <Header.Subheader>
                    {songString}
                </Header.Subheader>
            </Header>
        )
        let artwork;
        if (playlist.songs.length > 0) {
            artwork = playlist.songs[0].artwork;
        } else {
            artwork = '/assets/playlist_default';
        }
        return (
            <Dimmer.Dimmable
                as={Image}
                dimmed={active}
                dimmer={{ active, content }}
                onMouseEnter={this.handleShow}
                onMouseLeave={this.handleHide}
                size='small'
                src={artwork}
            />
        )
    }
}