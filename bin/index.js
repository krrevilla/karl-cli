#!/usr/bin/env node

const clear = require('clear');

const program = require('commander');
const { pageMake } = require('../lib/page');
const { version } = require('../package.json');

clear();

program.version(version).description('Karl CLI');

program
  .command('page:make')
  .alias('p:m')
  .description('Create a new page')
  .option('-r, --root <root>', 'Define the root of your source file (app/src)', 'app')
  .requiredOption('-pn, --pagename <pagename>', 'Name of your page')
  .action(pageMake);

program.parse(process.argv);
