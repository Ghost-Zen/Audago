import React from 'react'
import _ from 'lodash'
import { Query } from 'react-apollo';
import { ONCHANGE_SEARCH } from '../api/typedefs';
import { Search, Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

const initialState = {
    isLoading: false,
    results: [],
    value: '',
    preventLoop: 1,
    redirect: false,
    selectedSongData: ''
}

export default class OnChangeSearch extends React.Component {
    state = initialState

    handleResultSelect = (e, { result }) => {
        let {songData} = this.state
        let selectedSongData = {searchSong:[songData[result.id]]}
        this.setState({ value: result.title, redirect: true, selectedSongData })
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value, preventLoop: 1, results:[] })
        this.setState({
            isLoading: false,
        })
    }

    handleResData = (data) => {
        if (data.onChangeSearch.length > 0) {
            let top4Res = [];
            let rawData = [];
            for (let z = 0; z < 4; z++) {
                let apiRes = data.onChangeSearch[z]
                let onSearchData = {
                    id: z,
                    title: apiRes.artist,
                    description: apiRes.track,
                    image: apiRes.artwork
                }
                rawData.push(apiRes)
                top4Res.push(onSearchData)
            }
            this.setState({
                preventLoop: 0,
                results: top4Res,
                songData: rawData
            })
        }
    }

    render() {
        let { value, results, preventLoop, redirect, selectedSongData } = this.state
        let search = value
        if (redirect) {
            this.setState({ redirect: false })
            return (
                <Redirect to={{
                    pathname: '/webplayer',
                    state: { data: selectedSongData }
                }} />
            )
        }
        return (
            <Query query={ONCHANGE_SEARCH} variables={{ search }}>
                {({ loading, error, data }) => {
                    if (!loading && preventLoop === 1) {
                        this.handleResData(data)
                    }
                    return (
                        <Grid>
                            <Grid.Column width={8}>
                                <Search
                                    loading={loading}
                                    onResultSelect={this.handleResultSelect}
                                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                        leading: true,
                                    })}
                                    results={results}
                                    value={value}
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
