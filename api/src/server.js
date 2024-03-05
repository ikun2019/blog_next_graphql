const { ApolloServer, gql } = require('apollo-server');

// スキーマの定義
// 型定義でTypeScriptのinterfaceみたいなもの
const typeDefs = gql`
  type Query {
    info: String!
  }
`;

// リゾルバ関数
// 値を入れる
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン"
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`サーバー起動中...${url}`);
});