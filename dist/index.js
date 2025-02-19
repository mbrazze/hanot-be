import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createContext } from './app/context/contextProvider';
const typeDefs = `#graphql
  type Query {
    hello: String
    userInfo: UserInfo
  }

  type UserInfo {
    uid: String
    role: String
  }
`;
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        userInfo: (_, __, context) => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }
            return {
                uid: context.user.id,
                role: context.user.role,
            };
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    context: createContext,
    listen: { port: process.env.PORT ? parseInt(process.env.PORT) : 4000 },
});
console.log(`🚀 Server ready at: ${url}`);
