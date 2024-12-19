#!/usr/bin/env node

/**
 * death
 * Command line tool to kill processes
 *
 * @author Mitul Patel <https://mitulpa.tel>
 */

import { init as cliInit } from './utils/cli.js';
import init from './utils/init.js';
import log from './utils/log.js';

(async () => {
	try {
		await cliInit();
	} catch (error) {
		console.error(chalk.red('Fatal error:', error.message));
		process.exit(1);
	}
})();
