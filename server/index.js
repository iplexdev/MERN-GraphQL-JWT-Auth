import express from 'express';
import bodyParser from 'body-parser';
import {graphqlHTTP} from 'express-graphql'
import graphQLSchema from './graphql/schema';
import graphQLResolvers from './graphql/resolvers';
import cors from 'cors';
import mongoose from 'mongoose';
const config = require('./DB.js')
const app = express();

// middleware of express
app.use(
    cors(),
    bodyParser.json()
)
app.use(
    "/graphql",
    graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
    })
  );
function main() {
    const port = process.env.PORT || 5000 ;
    mongoose.connect(config.DB, {
        useNewUrlParser: true
    }).then(() => {
        app.listen(port, () => {
            console.log(`Database is connected & server is listing on port  : ${port}`);
        })
    }).catch(err => {
        console.log('server error', err);
    })
}
// calling main
main();