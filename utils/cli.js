import chalk from 'chalk';
import inquirer from 'inquirer';
import meowHelp from 'cli-meow-help';
import meow from 'meow';
import { listProcesses, displayProcesses, killProcess } from './processes.js';

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		shortFlag: `c`,
		desc: `Clear the console`
	},
	interactive: {
		type: `boolean`,
		default: false,
		shortFlag: `i`,
		desc: `Run in interactive mode`
	},
	kill: {
		type: `string`,
		shortFlag: `k`,
		desc: `Kill a process by PID`
	}
};

const helpText = meowHelp({
	name: `death`,
	flags,
	commands: [
		{
			name: 'list',
			desc: 'List all processes'
		},
		{
			name: 'kill',
			desc: 'Kill a process by PID'
		}
	]
});

const options = {
	importMeta: import.meta,
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

const cli = meow(helpText, options);

async function handleNonInteractive(cli) {
	const processes = await listProcesses();

	if (cli.flags.kill) {
		await killProcess(cli.flags.kill);
		return;
	}

	displayProcesses(processes);
}

async function handleInteractive() {
	while (true) {
		console.clear();
		console.log(chalk.yellow('Process Killer CLI'));
		console.log(chalk.gray('-------------------\n'));

		const processes = await listProcesses();
		displayProcesses(processes);

		const { action } = await inquirer.prompt([
			{
				type: 'list',
				name: 'action',
				message: 'What would you like to do?',
				choices: [
					{ name: 'Kill a process', value: 'kill' },
					{ name: 'Refresh process list', value: 'refresh' },
					{ name: 'Exit', value: 'exit' }
				]
			}
		]);

		if (action === 'exit') {
			console.log(chalk.yellow('\nGoodbye!'));
			break;
		}

		if (action === 'kill') {
			const { pid } = await inquirer.prompt([
				{
					type: 'input',
					name: 'pid',
					message: 'Enter the PID of the process to kill:',
					validate: input => !isNaN(input) && input.trim() !== ''
				}
			]);

			await killProcess(pid);

			const { continue: shouldContinue } = await inquirer.prompt([
				{
					type: 'confirm',
					name: 'continue',
					message: 'Press enter to continue...',
					default: true
				}
			]);
		}
	}
}

export async function init() {
	if (cli.flags.interactive) {
		await handleInteractive();
	} else {
		await handleNonInteractive(cli);
	}
}

export default cli;
