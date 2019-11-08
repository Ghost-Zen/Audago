import PropTypes from 'prop-types'
import _ from 'lodash'
import React from 'react'
import { Query } from 'react-apollo';
import { ONCHANGE_SEARCH } from '../api/typedefs';
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react'


let source = _.times(1, () => (
    {
        artist:"test"
    }
))

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
        data: "",
        num: 1,
        value: ""
    }
    // state = initialState

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })


    

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value, num:1 })
        setTimeout(() => {
            // if (this.state.value.length < 1) return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => {
                re.test(result.artist)
            }
            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    
    }

    handleResData = (data) => {
        if (data.onChangeSearch.length > 0) {
            let a = [data.onChangeSearch]
            this.setState({
                num: 0,
                data: a
            })
        }
    }

    render() {
        let { isLoading, value, results, num } = this.state
        let search = value
        return (
            <Query query={ONCHANGE_SEARCH} variables={{ search }}>
                {({ loading, error, data }) => {
                    if (!loading && num === 1) {
                        this.handleResData(data)
                    }
                    return (
                        <Grid>
                            <Grid.Column width={6}>
                                <Search
                                    loading={loading}
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
