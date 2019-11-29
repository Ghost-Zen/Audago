import React from 'react';
import Navbar from '../components/navbar';
import { Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import Auth from '../utils/Auth';

export default class HomePage extends React.Component {
    state = {
        redirect: false
    }


    componentDidMount() {
        if (this.state.redirect) {
            window.addEventListener('beforeunload', this.beforeunload.bind(this));
            axios
                .post('/signIn', { username: Auth.getUserName() })
                .then(res => { });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.beforeunload.bind(this));
    }

    beforeunload() {
        if (this.state.redirect) {
            axios
                .post('/signOut', { username: Auth.getUserName(), date: moment().format() })
                .then(res => { });
        }
    }


    render() {
        let { redirect } = this.state
        if (redirect) {
            return <Redirect to='/webplayer' />
        }
        return (
            <div className="bg">
                <Navbar />
                <Header as='h1' icon textAlign='center' inverted style={{ fontSize: 40, marginTop: '4em' }}>
                    <Header.Content>
                        Lose yourself in
                  50 million songs.
      </Header.Content>
                    <Button onClick={() => this.setState({ redirect: true })}>Start Listening</Button>
                </Header>
            </div>
        )
    }
}