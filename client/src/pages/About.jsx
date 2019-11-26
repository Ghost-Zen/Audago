import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Header, Button } from 'semantic-ui-react';
export default class HomePage extends React.Component {
    state = {
        redirect: false
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
