import React from 'react'
import { Query } from 'react-apollo';
import { ONCHANGE_SEARCH } from '../api/typedefs';
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react'
export default class SearchQuery extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        data:""
      }
    }
    setData = (data) => {
    this.props.setResultData(data)
    }

  render(){
    let search = this.props.search 
    return (
  <Query query={ONCHANGE_SEARCH} variables={{ search }}>
    {({ loading, error, data })  => {
      this.setData(data)
      return (
        <Grid>
        <Grid.Column width={6}>
          <Search
            loading={loading}
            value={search}
          />
        </Grid.Column>
      </Grid>
      );
    }}
  </Query>
    )  
}
}

