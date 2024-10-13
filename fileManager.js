import { homedir } from "os";
import { dirname, join } from "path";
import { readdirSync, statSync } from "fs";

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

function listDirectory() {
  const files = readdirSync(currentDir);
  const fileDetails = files.map((file) => {
    const filePath = join(currentDir, file);
    const type = statSync(filePath).isDirectory() ? "directory" : "file";
    return {
      Name: file,
      Type: type,
    };
  });

  const sortedFiles = fileDetails.sort((a, b) => {
    return a.Type === b.Type
      ? a.Name.localeCompare(b.Name)
      : a.Type === "directory"
      ? -1
      : 1;
  });

  console.table(sortedFiles);
}

function handleCommand(command) {
  const [cmd, ...args] = command.trim().split(" ");

  switch (cmd) {
    case ".exit":
      exit();
    case "up":
      changeDirectoryUp();
      break;
    case "ls":
      listDirectory();
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
