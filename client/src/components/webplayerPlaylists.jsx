import React from 'react';
import { Header, Card } from 'semantic-ui-react';
import { ALL_PLAYLISTS } from '../api/queries';
import Auth from '../utils/Auth';
import { Query } from 'react-apollo';
import PlaylistCards from './playlistCards';
import SongList from '../components/songlist';

export default class WebplayerPlaylists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewSongs: false,
            data: [],
            choice: ''
        }
    }

    playTrack = (songList, item) => {
        console.log(songList, item)
        let index = item
        let x = document.querySelector("#player");
        x.src = songList[index];
        index++;
        var playPromise = x.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                x.addEventListener('ended', async () => {
                    if (index !== songList.length) {
                        await this.playTrack(songList, index);
                    } else {
                        await this.playTrack(songList, 0);
                    }
                });
            })
                .catch(error => {
                });
        }
    }
    viewSongs = (data, choice) => {
        this.setState({
            viewSongs: true,
            data,
            choice
        });
    }

    renderSongs = () => {
        return (
            <SongList
                data={this.state.data}
                choice={this.state.choice}
                from='webplayer'
                playTrack={this.playTrack}
                reset={this.reset}
            />
        )
    }

    renderPlaylists = () => (
        <Query query={ALL_PLAYLISTS}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                let playlistData = data.allPlaylists.playlists;
                let songTiles = [];
                for (let z = 0; z < playlistData.length; z++) {
                    let playlist = playlistData[z];
                    if (playlist.songs.length > 0) {
                        songTiles.push(
                            <div key={z} className="cardDiv">
                                <PlaylistCards
                                    image={playlist.songs[0].artwork}
                                    songs={playlist.songs}
                                    playTrack={this.playTrack}
                                    playlist_meta={playlist}
                                    index={z}
                                /><br />
                                <strong class='playlistSelect' onClick={() => this.viewSongs(playlistData, playlist.name)}>{playlist.name}</strong>
                            </div>
                        )
                    }
                }
                return songTiles
            }}
        </Query>
    )

    reset = () => {
        this.setState({
            viewSongs: false,
            choice: ''
        });
    }

    renderData = () => {
        if (this.state.viewSongs) {
            return (
                <div>
                    {this.renderSongs()}
                </div>
            )
        } else {
            return (
                <Card.Group centered itemsPerRow={6}>
                    {this.renderPlaylists()}
                </Card.Group>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderData()}
            </div>
        )
    }
}
