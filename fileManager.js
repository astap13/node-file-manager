import { exit } from "./src/utils/exit.js";
import { changeDirectoryUp } from "./src/changeDirectoryUp.js";
import { listDirectory } from "./src/listDirectory.js";
import { readFile } from "./src/readFile.js";
import { handleUnknownCommand } from "./src/utils/handleUnknownCommand.js";
import { displayCurrentDirectory } from "./src/utils/displayCurrentDirectory.js";
import { createFile } from "./src/createFile.js";
import { renameFile } from "./src/renameFile.js";
import { deleteFile } from "./src/deleteFile.js";
import { copyFile } from "./src/copyFile.js";
import { moveFile } from "./src/moveFile.js";
import { hashFile } from "./src/hashFile.js";

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
    case "rn":
      renameFile(args[0], args[1]);
      break;
    case "rm":
      deleteFile(args[0]);
      break;
    case "cp":
      copyFile(args[0], args[1]);
      break;
    case "mv":
      moveFile(args[0], args[1]);
      break;
    case "hash":
      hashFile(args[0]);
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
