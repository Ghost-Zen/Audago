import React from 'react';
import { Image, Tab, Placeholder, Grid, Header, Divider } from 'semantic-ui-react';


export default class Profile extends React.Component {
    render() {
        const panes = [
            {
                menuItem: 'Playlists',
                render: () => <Tab.Pane attached={false}>List of Playlists</Tab.Pane>,
            },
            {
                menuItem: 'Settings',
                render: () => <Tab.Pane attached={false}>Account details/ able to change account details</Tab.Pane>,
            }
        ]
        return (
            <Grid>
                <Grid.Row style={{ marginTop: 15 }}>
                    <Grid.Column width={16}>
                        <Header as='h2'color='teal' floated='left'>
                            <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> Username
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}