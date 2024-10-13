const os = require('os');

const homeDir = os.homedir();
let currentDir = homeDir;

// Function to display the current working directory
function displayCurrentDirectory() {
    console.log(`You are currently in ${currentDir}`);
}

function handleUnknownCommand() {
    console.log('Invalid input. Please try again.');
}


function handleCommand(command) {
    const [cmd, ...args] = command.trim().split(' ');

    switch (cmd) {
        case '.exit':
            console.log(`Thank you for using File Manager, ${username}, goodbye!`);
            process.exit();
        default:
            handleUnknownCommand();
            break;
    }
}



const username = process.argv.find(arg => arg.startsWith('--username=')).split('=')[1];

console.log(`Welcome to the File Manager, ${username}!`);

process.stdin.on('data', (input) => {
    handleCommand(input.toString());
    displayCurrentDirectory();
});