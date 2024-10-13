const username = process.argv.find(arg => arg.startsWith('--username=')).split('=')[1];

console.log(`Welcome to the File Manager, ${username}!`);

