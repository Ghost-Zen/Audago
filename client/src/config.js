import ApolloClient from 'apollo-boost'

const config = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('sudo')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer:${token}` : ''
      }
    })
  }
})
export default config
