import chalk from 'chalk';
import inquirer from 'inquirer';
import meow from 'meow';
import { listProcesses, displayProcesses, killProcess } from './processes.js';

const flags = {
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
	},
	list: {
		type: `boolean`,
		shortFlag: `l`,
		desc: `List all processes`
	}
};

const commands = {
	list: {
		desc: `List all running processes`
	},
	kill: {
		desc: `Kill a process by PID`
	}
};

const helpText = `
	Usage
	  $ death [options] [command]

	Commands
	  list          List all running processes
	  kill <pid>    Kill a process by PID

	Options
	  -i, --interactive    Run in interactive mode
	  -k, --kill <pid>    Kill a process by PID
	  -l, --list          List all processes
	  -h, --help         Show help text
	  -v, --version      Show version

	Examples
	  $ death              # Run in interactive mode
	  $ death list        # List all processes
	  $ death -k 1234     # Kill process with PID 1234
	  $ death -i          # Run in interactive mode
`;

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

	if (cli.flags.list || cli.input[0] === 'list') {
		displayProcesses(processes);
		return;
	}

	if (cli.input.length > 0) {
		console.log(cli.help);
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
	if (!cli.flags.kill && !cli.flags.list && cli.input.length === 0) {
		await handleInteractive();
	} else {
		await handleNonInteractive(cli);
	}
}

export default cli;
