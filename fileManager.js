import { exit } from "./src/exit.js";
import { changeDirectoryUp } from "./src/changeDirectoryUp.js";
import { listDirectory } from "./src/listDirectory.js";
import { readFile } from "./src/readFile.js";
import { handleUnknownCommand } from "./src/utils/handleUnknownCommand.js";
import { displayCurrentDirectory } from "./src/utils/displayCurrentDirectory.js";
import { createFile } from "./src/createFile.js";

function handleCommand(command) {
  const [cmd, ...args] = command.trim().split(" ");

  switch (cmd) {
    case ".exit":
      exit(username);
    case "up":
      changeDirectoryUp();
      break;
    case "ls":
      listDirectory();
      break;
    case "cat":
      readFile(args[0]);
      break;
    case "add":
      createFile(args[0]);
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
