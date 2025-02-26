import { Resolvers } from '../generated/graphql';
import type { Context } from '../app/context/contextProvider';
import { DateTime } from './scalars';
import queries from './queries';
import mutations from './mutations';
import fieldResolvers from './fields';

const resolvers: Resolvers<Context> = {
  DateTime: DateTime,
  Query: queries,
  Mutation: mutations,
  ...fieldResolvers,
};

export default resolvers;
