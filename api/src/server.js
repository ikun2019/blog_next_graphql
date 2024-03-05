const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');

let links = [
  {
    id: "link-0",
    description: "GraphQLチュートリアル",
    url: "www.google.com"
  }
]

// リゾルバ関数
// 値を入れる
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`サーバー起動中...${url}`);
});