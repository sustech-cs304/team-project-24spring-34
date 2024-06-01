require('dotenv').config();
const chalk = require('chalk');

const originalConsole = global.console;
global.console = {
  log: function (...args) {
    originalConsole.log(chalk.green(...args));
  },
  error: function (...args) {
    originalConsole.error(chalk.red(...args));
  },
  info: originalConsole.info,
  warn: originalConsole.warn,
  debug: originalConsole.debug,
};

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const setupSwagger = require('./swagger');

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

setupSwagger(app);

app.use(express.json());

app.listen(process.env.LiSTEN_PORT, process.env.LISTEN_HOST, () => {
  console.log(
    `Server listening on http://${process.env.LISTEN_HOST}:${process.env.LISTEN_PORT}`,
  );
});
