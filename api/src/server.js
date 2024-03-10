const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const { PrismaClient } = require('@prisma/client');
const { getUserId } = require('./utils');

// resolverの読み込み
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');

// サブスクリプションの実装
const { PubSub } = require('apollo-server');

// 初期化
const prisma = new PrismaClient();
const pubsub = new PubSub();

// リゾルバ関数
// 値を入れる
const resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  User,
  Vote,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`サーバー起動中...${url}`);
});