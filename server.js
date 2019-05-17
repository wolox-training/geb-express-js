const config = require('./config'),
  migrationsManager = require('./migrations'),
  logger = require('./app/logger'),
  server = require('./app/graphql');

const port = config.common.api.port || 8080;

server.listen(port).then(({ url }) => {
  logger.info(`🚀 Server ready at ${url}`);
});
