import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Auth from '../utils/Auth';

export default class Sidebar extends React.Component {

    tabSwitch = (selected) => {
        this.props.setTab(selected)
    }

    render() {
        return (
            <SideNav className="sidebar"
                onSelect={(selected) => {
                    if (selected === 'signout') return Auth.signOutUser()
                    this.tabSwitch(selected)
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
            </NavText>
                    </NavItem>
                    <NavItem eventKey="playlist">
                        <NavIcon>
                            <i className="fas fa-list" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Playlist
            </NavText>
                    </NavItem>

                    <NavItem eventKey="more">
                        <NavIcon>
                            <i className="fa fas fa-cogs" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Settings
            </NavText>
                        <NavItem >
                            <NavText>
                                Profile
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="manage_playlist">
                            <NavText>
                                Manage playlists
                            </NavText>
                        </NavItem>
                    </NavItem>

                    <NavItem eventKey="signout">
                        <NavIcon>
                                <i className="fas fa-sign-out-alt" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                            <NavText>
                                Signout
            </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
                )
            }
        }
