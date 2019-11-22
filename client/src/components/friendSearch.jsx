import React from 'react';
import { Card, Menu, Label, Header, Grid, Input } from 'semantic-ui-react';
import { } from '../api/queries';
import '../styling/App.css';
import { Query, Mutation } from 'react-apollo';

export default class Friends extends React.Component {
    state = {}

    render() {
        return (
            <Grid>
                <Grid.Column>
                    <Input placeholder='Search...' />
                </Grid.Column>
            </Grid>
        )
    }
}
