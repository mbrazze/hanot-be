import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { type Context, createContext } from './app/context/contextProvider';
import resolvers from './resolvers';
import typeDefs from './graphql/schema';

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

try {
  const { url } = await startStandaloneServer(server, {
    context: createContext,
    listen: {
      port: process.env.PORT ? Number.parseInt(process.env.PORT) : 4000,
    },
  });
  console.log(`🚀 Server ready at: ${url}`);
} catch (error) {
  console.error('Failed to start the server:', error);
}
