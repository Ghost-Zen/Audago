import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Link } from 'react-router-dom';
import Auth from '../utils/Auth';

export default class Sidebar extends React.Component {

    render() {
        return (
            <SideNav className="sidebar"
                onSelect={(selected) => {
                    console.log(selected)
                    // Add your code here
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <Link to='/'><i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /></Link>
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
                                <Link to='/profile'>Profile</Link>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="more/playlist">
                            <NavText>
                                <s>Playlist</s>
                            </NavText>
                        </NavItem>
                    </NavItem>

                    <NavItem eventKey="signout">
                        <NavIcon>
                            <Link onClick={() => Auth.signOutUser()}>
                                <i className="fas fa-sign-out-alt" style={{ fontSize: '1.75em' }} />
                            </Link>
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
