const Query = {
    hello: () => 'Hello World',
    test: () => 'Test Success, GraphQL server is up & running !!',
    createAccount:(input) => {
        console.log(input),
        `respone=>${input}`
 }
}
export default Query