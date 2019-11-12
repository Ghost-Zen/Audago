import React from 'react';
import Navbar from '../components/navbar';
import { Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
export default class HomePage extends React.Component {
    state = {
        redirect: false
    }

    render() {
        let { redirect } = this.state
        if (redirect) {
            return <Redirect to='/login' />
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