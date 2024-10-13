import { homedir } from "os";
import { dirname } from "path";

const homeDir = homedir();
let currentDir = homeDir;

function displayCurrentDirectory() {
  console.log(`You are currently in ${currentDir}`);
}

function handleUnknownCommand() {
  console.log("Invalid input. Please try again.");
}

function exit() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

function changeDirectoryUp() {
  const parentDir = dirname(currentDir);
  if (parentDir !== currentDir) {
    currentDir = parentDir;
  }
  displayCurrentDirectory();
}

function handleCommand(command) {
  const [cmd, ...args] = command.trim().split(" ");

  switch (cmd) {
    case ".exit":
      exit();
    case "up":
      changeDirectoryUp();
      break;
    default:
      handleUnknownCommand();
      break;
  }
}

const username = process.argv
  .find((arg) => arg.startsWith("--username="))
  .split("=")[1];

console.log(`Welcome to the File Manager, ${username}!`);

process.stdin.on("data", (input) => {
  handleCommand(input.toString());
  displayCurrentDirectory();
});
