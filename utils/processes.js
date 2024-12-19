import chalk from 'chalk';
import { execSync } from 'child_process';
import Table from 'cli-table3';

export async function listProcesses() {
	try {
		const output = execSync('ps aux').toString();
		const lines = output.split('\n');
		const processes = lines
			.slice(1)
			.map(line => {
				const parts = line.trim().split(/\s+/);
				if (parts.length >= 11) {
					return {
						pid: parts[1],
						user: parts[0],
						cpu: parts[2],
						mem: parts[3],
						command: parts.slice(10).join(' ')
					};
				}
				return null;
			})
			.filter(Boolean);

		return processes;
	} catch (error) {
		console.error(chalk.red('Error listing processes:', error.message));
		return [];
	}
}

export function displayProcesses(processes) {
	const table = new Table({
		head: [
			chalk.cyan('PID'),
			chalk.cyan('User'),
			chalk.cyan('CPU %'),
			chalk.cyan('Memory %'),
			chalk.cyan('Command')
		],
		colWidths: [10, 15, 10, 10, 50]
	});

	processes.forEach(proc => {
		table.push([
			proc.pid,
			proc.user,
			proc.cpu,
			proc.mem,
			proc.command.substring(0, 47) +
				(proc.command.length > 47 ? '...' : '')
		]);
	});

	console.log(table.toString());
}

export async function killProcess(pid) {
	try {
		execSync(`kill ${pid}`);
		console.log(chalk.green(`✓ Successfully killed process ${pid}`));
		return true;
	} catch (error) {
		console.error(
			chalk.red(`Error killing process ${pid}:`, error.message)
		);
		return false;
	}
}
