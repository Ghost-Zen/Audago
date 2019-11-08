import PropTypes from 'prop-types'
import _ from 'lodash'
import React from 'react'
import { Query } from 'react-apollo';
import { ONCHANGE_SEARCH } from '../api/typedefs';
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '', num: 1 }

const source = _.times(5, () => ({
  title: "title",
  description: "descript",
  image: "image",
  price: "price"
}))

export default class OnChangeSearch extends React.Component {
  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value, num:1 })

    // setTimeout(() => {
    //   if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        // results: _.filter(source, isMatch),
                //   results: ([{title:"J. Cole",description:"G.O.M.D"}]),
                // results: this.state.data,
        //         // results: _.filter(this.state.data, isMatch),
      })
    // }, 300)
  }

  handleResData = (data) => {
    console.log(data)
    if (data.onChangeSearch.length > 0) {
        let a = data.onChangeSearch[0]
        // console.log(a.artist)
        this.setState({
            num: 0,
            results: [{
                title:a.artist,
                description:a.track,
                image:a.artwork
            }]
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
