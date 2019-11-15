import React, { Component } from 'react'
import { Header, Grid, Input, Button, Message, Icon, Modal, Divider, Popup, List } from 'semantic-ui-react'
import { USER_DATA, UPDATE_USER, UPDATE_PASSWORD } from '../api/queries';
import { Query, Mutation } from 'react-apollo';
import Auth from '../utils/Auth';

export default class settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: Auth.getUserName(),
            firstName: '',
            lastName: '',
            email: '',
            response: '',
            status: false,
            modalOpen: false,
            currentPass: '',
            newPass: '',
            testPass: '',
            modalError: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    renderUserSettings = () => (
        <Query query={USER_DATA} variables={{ username: Auth.getUserName() }} pollInterval={500}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                let info = data.userData.user;
                return (
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Header inverted floated='left' as='h4'>
                                    Username: {this.state.username}
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={7}>
                                <Input style={{ width: 200, float: 'left' }} label={{ tag: false, color: 'teal', content: 'First name' }} placeholder={info.firstName} name='firstName' onChange={this.handleChange} />
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <Input style={{ width: 200, float: 'left' }} label={{ tag: false, color: 'teal', content: 'Last name' }} placeholder={info.lastName} name='lastName' onChange={this.handleChange} />
                            </Grid.Column>
                        </Grid.Row>
                        {this.renderEmail(info)}
                    </Grid>
                )
            }}
        </Query>
    )

    renderMessage = () => {
        if (this.state.status && this.state.response) {
            return (
                <Message positive>
                    <Message.Header>{this.state.response}</Message.Header>
                </Message>
            )
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => {
        this.setState({
            modalOpen: false,
            modalError: false
        })
    }

    handleCheck = (info) => {
        if (this.state.newPass === this.state.testPass) {
            if (info.status) {
                this.setState({ modalOpen: false })
            } else {
                this.setState({
                    modalError: true,
                    response: info.response
                });
            }
        } else {
            this.setState({
                modalError: true,
                response: info.response
            });
        }
    }

    renderEmail = (info) => {
        return (
            <Grid.Row>
                <Grid.Column width={10}>
                    <Input fluid label={{ tag: false, color: 'teal', content: 'Email' }} placeholder={info.email} name='email' onChange={this.handleChange} />
                </Grid.Column>
            </Grid.Row>
        )
    }

    handleModalError = () => {
        if (this.state.modalError) {
            return (
                <Message style={{ margin: 0 }} negative>
                    <Message.Header>{this.state.response}</Message.Header>
                </Message>
            )
        }
    }


    render() {
        let { username, firstName, lastName, email, currentPass, newPass, testPass } = this.state;
        return (
            <div>
                {this.renderUserSettings()}
                <br />
                {this.renderMessage()}
                <Mutation mutation={UPDATE_USER} variables={{ username, updateData: { firstName, lastName, email } }}
                    update={(cache, { data }) => {
                        this.setState({
                            response: data.updateUser.response,
                            status: data.updateUser.status
                        });
                    }
                    }
                >
                    {updateInfo => (
                        <Button type="submit" color='teal' onClick={updateInfo}>
                            Update
                    </Button>
                    )}
                </Mutation>
                <Modal
                    trigger={<Button onClick={this.handleOpen}>Change Password</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    size='mini'
                >
                    <Header icon='lock' content='Change password' />
                    <Modal.Content>
                        <Header as='h4'> Current Password
                            <Input name='currentPass' type='password' onChange={this.handleChange}></Input>
                        </Header>
                    </Modal.Content>
                    <Divider style={{ margin: 0 }} />
                    <Modal.Content>
                        <Header as='h4'> New Password <br />
                            <Input name='newPass' type='password' onChange={this.handleChange}></Input>
                            <Popup trigger={<Icon size='mini' style={{ float: 'right' }} circular name='info' />} wide>
                                <Header as='h2'>
                                    A strong password requires:
                                </Header>
                                <List bulleted>
                                    <List.Item>More than 8 Characters</List.Item>
                                    <List.Item>Atleast 1 Uppercase letter</List.Item>
                                    <List.Item>Atleast 1 Lowercase letter</List.Item>
                                    <List.Item>Atleast 1 Special character (!@#$%^&*)</List.Item>
                                    <List.Item>Atleast 1 Number</List.Item>
                                </List>
                            </Popup>
                        </Header>
                        <Header as='h4'> Confirm Password
                        <Input style={{ marginTop: 3 }} name='testPass' type='password' onChange={this.handleChange}></Input>
                        </Header>
                    </Modal.Content>
                    {this.handleModalError()}
                    <Modal.Actions>
                        <Button color='red' onClick={this.handleClose} inverted>
                            <Icon name='cancel' /> Cancel
                        </Button>
                        <Mutation mutation={UPDATE_PASSWORD} variables={{ username, currentPass, newPass, testPass }}
                            update={(cache, { data }) => {
                                let info = data.updatePassword;
                                this.handleCheck(info);
                            }
                            }
                        >
                            {updatePass => (
                                <Button color='green' onClick={updatePass} inverted>
                                    <Icon name='check' /> Update
                            </Button>
                            )}
                        </Mutation>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}
