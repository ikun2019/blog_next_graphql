const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const { PrismaClient } = require('@prisma/client');
const { getUserId } = require('./utils');

// resolverの読み込み
const Query = require('./utils');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');

const prisma = new PrismaClient();

// リゾルバ関数
// 値を入れる
const resolvers = {
  Query,
  Mutation,
  Link,
  User,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`サーバー起動中...${url}`);
});