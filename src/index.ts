import express from 'express';
import { connectDB } from './config/db.config';
import dotenv from 'dotenv';
dotenv.config();
import helmet from 'helmet';
import cors from 'cors';
import { corsOptions } from './utils/corsOptions';
import { apiLimiter } from './middlewares/rateLimiter.middleware';
import { errorHandler } from './middlewares/error.middleware';
import compression from 'compression';
import { staticFileConfig } from './config/static.config';
import { httpLogger, logger } from './utils/logger';
import { env } from './config/env.config';
import { createGraphQLServer } from './graphQL/graphQL.server';
import userRouter from './Modules/userModule/userRoute/user.route';
import uploadRouter from './Modules/uploadModule/uploadRoute/upload.route';

const app = express();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false,
  })
);

// CORS
app.use(cors(corsOptions));

// Body parser
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Static files
app.use(express.static(staticFileConfig.path, staticFileConfig.options));

// Compression & proxy
app.use(compression());
app.set('trust proxy', 1);

// HTTP request logging
app.use(httpLogger);

// Rate limiter
app.use(apiLimiter);

// REST routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1', uploadRouter);

// Logger test
logger.info('Server is starting');
logger.error('This is an error message');

// Start server
const startServer = async () => {
  try {
    await connectDB();

    // ✅ Setup GraphQL BEFORE 404 handler
    await createGraphQLServer(app);

    // 404 handler for unmatched routes (after REST + GraphQL are mounted)
    app.all('*', (req, res, next) => {
      next(new Error(`Can't find ${req.originalUrl} on this server.`));
    });

    // Error handling middleware
    app.use(errorHandler);

    // Listen once for both REST + GraphQL
    app.listen(env.PORT, () => {
      console.log(`
=======================================
 Server running successfully 🚀
 REST API:     http://localhost:${env.PORT}/api/v1/users
 GraphQL API:  http://localhost:${env.PORT}/graphql
 Environment:  ${env.NODE_ENV || 'development'}
 Time:         ${new Date().toLocaleString()}
=======================================
      `);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

startServer();
