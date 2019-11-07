import PropTypes from 'prop-types'
import _ from 'lodash'
import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { ONCHANGE_SEARCH } from '../api/typedefs';
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react'

const source = _.times(5, () => ({
    artist: 'title',
    //   description: 'descript',
    //   image: 'image',
    //   price: 'price'
}))

const resultRenderer = ({ artist }) => <Label content={artist} />

resultRenderer.propTypes = {
    artist: PropTypes.string,
    description: PropTypes.string,
}

// const initialState = { isLoading: false, results: [], value: '' }

export default class OnChangeSearch extends React.Component {
    state = {
        isLoading: false,
        results: [],
        value: ""
    }
    // state = initialState

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            // if (this.state.value.length < 1) return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.artist)

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    }

    handleResData = (data) => {
        if(data){
            if(data.onChangeSearch.result){
                console.log(data.onChangeSearch.result)
            }
    }
}

    render() {
        let { isLoading, value, results } = this.state
        let search = value
        return (
            <Query query={ONCHANGE_SEARCH} variables={{ search }}>
                {({ loading, error, data }) => {
                    this.handleResData(data)
                    return (
                        <Grid>
                            <Grid.Column width={6}>
                                <Search
                                    loading={isLoading}
                                    onResultSelect={this.handleResultSelect}
                                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                        leading: true,
                                    })}
                                    results={results}
                                    value={value}
                                    resultRenderer={resultRenderer}
                                    {...this.props}
                                />
                            </Grid.Column>
                        </Grid>
                    );
                }}
            </Query>
        )
    }
}
