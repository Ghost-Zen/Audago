import ApolloClient from 'apollo-boost';
const config ={

    graphql: new ApolloClient({
        uri: '/graphql',
      })

}
export default config