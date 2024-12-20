# Death

A command-line interface (CLI) tool for managing system processes. Death provides both an interactive mode and command-line options for listing and killing processes.

## ⚠️ Important Disclaimer

This tool is intended for process management purposes only using a play on words. If you're experiencing thoughts of self-harm or harming others, please seek help immediately. You are not alone, and there are professionals ready to help:

- National Suicide Prevention Lifeline (US): 988 or 1-800-273-8255
- Crisis Text Line: Text HOME to 741741

Please consult with a licensed medical professional or mental health provider for proper care and treatment in a safe controlled environment. Your life has value, and help is available 24/7.

## Features

- 🔍 List all running processes with details (PID, CPU%, Memory%, Command)
- ⚡ Kill processes by PID
- 🖥️ Interactive mode with a user-friendly interface
- 📊 Formatted table output for better readability

## Installation

### Local Development Setup

1. Clone the repository:

```bash
git clone https://github.com/bittricky/death.git
cd death
```

2. Install dependencies:

```bash
npm install
```

3. Link the package locally (optional):

```bash
npm link
```

## Usage

### Running Locally

```bash
# Using npm scripts
npm run dev      # Start in interactive mode
npm start        # Alternative way to start

# If globally linked
death           # Start in interactive mode
```

### Command Line Options

```bash
# Show help
death --help

# List all processes
death -l
death list

# Kill a process by PID
death -k <pid>
death kill <pid>

# Run in interactive mode
death -i
```

### Interactive Mode

In interactive mode, you can:

1. View all running processes in a formatted table
2. Kill processes by entering their PID
3. Refresh the process list
4. Navigate using arrow keys and enter

## Commands and Flags

| Command/Flag        | Description                |
| ------------------- | -------------------------- |
| `list`              | List all running processes |
| `-l, --list`        | List all running processes |
| `-k, --kill <pid>`  | Kill a process by PID      |
| `-i, --interactive` | Run in interactive mode    |
| `-h, --help`        | Show help text             |
| `-v, --version`     | Show version               |

## Project Structure

```
death/
├── index.js          # Entry point
├── utils/
│   ├── cli.js        # CLI interface and command handling
│   └── processes.js  # Process management functions
└── package.json
```

## Dependencies

- `chalk` - Terminal string styling
- `inquirer` - Interactive command line interface
- `cli-table3` - Pretty unicode tables
- `meow` - CLI app helper

## License

MIT

## Author

Mitul Patel
