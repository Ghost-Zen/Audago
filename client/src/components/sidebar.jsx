import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default class Sidebar extends React.Component {

    render() {
        return (
            <SideNav className="sidebar"
                onSelect={(selected) => {
                    // Add your code here
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
                        <i className="fa fas fa-cogs" style={{ fontSize: '1.75em' }}></i>
                        </NavIcon>
                        <NavText>
                            Settings
            </NavText>
                        <NavItem eventKey="more/profile">
                            <NavText>
                                Profile
                </NavText>
                        </NavItem>
                        <NavItem eventKey="more/playlist">
                            <NavText>
                                Playlist
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