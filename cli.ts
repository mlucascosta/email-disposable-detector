#!/usr/bin/env ts-node

import { validateEmailFull } from './src/core/validateEmailFull';
import chalk from 'chalk';

const email = process.argv[2];

if (!email) {
  console.error(chalk.red('❌ Você precisa passar um e-mail como argumento.'));
  console.log(`\nUso:`);
  console.log(`  npx ts-node cli.ts example@dominio.com\n`);
  process.exit(1);
}

(async () => {
  try {
    const result = await validateEmailFull(email);

    console.log(chalk.green('\n✔ Resultado da validação:\n'));
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(chalk.red('\n❌ Erro ao validar o e-mail:'), error.message || error);
    process.exit(1);
  }
})();
