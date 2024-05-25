process.env.NODE_ENV = 'development';

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

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
