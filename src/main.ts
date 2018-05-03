import express from 'express'
import bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express'
import {schema} from './gql'
import {createServer} from 'http'

const app = express()

app.get('/', (_, res) => res.send('<h1>How are you doing there?</h1>'))

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

const SERVER_PORT = process.env.SERVER_PORT || 8080;
const server = createServer(app)

server.listen(SERVER_PORT, () => {
    console.log(`Server is up and running on ${SERVER_PORT}`)
})