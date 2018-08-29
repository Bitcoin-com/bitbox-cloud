#!/usr/bin/env node
require("babel-register");
// let path = require('path');
let program = require('commander');
// let chalk = require('chalk');
// let mkdirp = require('mkdirp');
// let cpFile = require('cp-file');
// let figlet = require('figlet');
// let clear = require('clear');
// let fs = require('fs');
// let os = require('os');
// let touch = require("touch");
// let emoji = require('node-emoji');
// let repl = require("repl");
// let ini = require('ini');
// let Wormhole = require('./lib/Wormhole').default;
// let clone = require('git-clone');
// let cmd = require('node-cmd');

program
  .version('0.0.3', '-v, --version')

program
  .command('auth:2fa')
  .description(`check 2fa status`)
  .action((name, options) => {
    console.log('2fa')
});

program
  .command('auth:login')
  .description(`login with your Heroku credentials`)
  .action(() => {
    console.log('login')
});

program
  .command('auth:logout')
  .description(`login with your Heroku credentials`)
  .action(() => {
    console.log('bar')
})

program
  .command('auth:token')
  .description(`outputs current CLI authentication token`)
  .action(() => {
    console.log('token')
});

program
  .command('auth:whoami')
  .description(`display the current logged in user`)
  .action(() => {
    console.log('whoami')
});

// program
//   .command('console')
//   .option('-e, --environment <environment>', 'environment of running BITBOX instance. Ex: production, staging. (Default: development)')
//   .description('Run a console with Bitcoin Cash RPC commands available')
//   .action((options) => {
//     let config;
//     try {
//       config = require(process.cwd() + '/wormhole.js').config;
//     } catch(err) {
//       console.log(chalk.red('Console command must be run inside a wormholecash project'));
//       process.exit(1);
//     }
//     let replServer = repl.start('> ');
//     let historyFile = path.join(process.cwd(), '.console_history');
//     require('repl.history')(replServer, historyFile);
//
//     let environment = fetchOption('environment=development', config, options);
//
//     replServer.context.Wormhole = new Wormhole(config.networks[environment]);
//   }
// );
//
// function fetchOption(kv, config, options) {
//   let parts = kv.split('=');
//   let key = parts[0];
//   let defaultVal = parts[1];
//   if(options && options[key]) {
//     return options[key];
//   } else if(config && config.new && config.new[key]) {
//     return config.new[key];
//   } else {
//     return defaultVal;
//   }
// }

program
  .parse(process.argv);

// print help if no command given
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
