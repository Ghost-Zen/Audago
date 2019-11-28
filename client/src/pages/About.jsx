import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Header, Button } from 'semantic-ui-react';
import axios from 'axios';
import Auth from '../utils/Auth';
import moment from 'moment';
export default class HomePage extends React.Component {
    state = {
        redirect: false
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.beforeunload.bind(this));    
        axios
            .post('/signIn', { username: Auth.getUserName() })
            .then(res => {});
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.beforeunload.bind(this));
    }

    beforeunload() {
        axios
            .post('/signOut', { username: Auth.getUserName(), date: moment().format() })
            .then(res => {});
      }

    render() {
        let { redirect } = this.state
        return (
            <div className="bg">
                <Navbar />
                <Header as='h1' icon textAlign='center' inverted style={{ fontSize: 40, marginTop: '4em' }}>
                    <Header.Content>
                        About us
      </Header.Content>
                    <a href='https://github.com/ghost-zen/audago'>
                        <Button onClick={() => this.setState({ redirect: true })}><code>source code</code></Button>
                    </a>
                </Header>
            </div>
        )
    }
}
