const express = require("express");
const cors=require('cors')
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { graphqlHTTP } = require("express-graphql");
const path = require("path");
const dotenv = require("dotenv");

const {protectedRoute}=require('./AuthMiddleware/authMiddleware')
const connectDB = require("./databases/db.mongdb");
const bodyParser = require("body-parser");

dotenv.config();
connectDB();

const port = process.env.PORT || 8000;

const typeArray = loadFilesSync(path.join(__dirname, "**/*.schema.graphql"));

const resolverArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const schema = makeExecutableSchema({
  typeDefs: typeArray,
  resolvers: resolverArray,
});
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
  if(req.method==='OPTIONS'){
    return res.sendStatus(200);
  }
  next();
})
app.use(protectedRoute)
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(port, () => {
  console.log(`GraphQL running on port: ${port}`.bgGreen);
});
