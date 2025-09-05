import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { Express } from 'express';
import { GraphQLFormattedError } from 'graphql';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'; // ✅ add this
import { userTypeDef } from '../Modules/userModule/userTypedefs/user.typedefs';
import { userResolver } from '../Modules/userModule/userResolvers/user.resolvers';
import { HTTP_STATUS_CODES } from '../utils/constants';

export const createGraphQLServer = async (app: Express) => {
  const server = new ApolloServer({
    typeDefs: [userTypeDef],
    resolvers: [userResolver],
    introspection: true,
    plugins: [
      //This enables the embedded local Sandbox UI
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    formatError: (formattedError: GraphQLFormattedError) => {
      return {
        message: formattedError.message,
        success: false,
        statusCode:
          formattedError.extensions?.code === 'BAD_USER_INPUT'
            ? HTTP_STATUS_CODES.BAD_REQUEST
            : HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        errors: [],
      };
    },
  });

  await server.start();

  const graphqlCorsOptions = {
    origin: [
      'http://localhost:3000',
      'http://localhost:7555',
      'https://studio.apollographql.com',
      'https://sandbox.apollo.dev',
    ],
    credentials: true,
  };

  app.use(
    '/graphql',
    cors(graphqlCorsOptions),
    bodyParser.json({ limit: '50mb' }),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          headers: req.headers,
        };
      },
    })
  );

  return app;
};
