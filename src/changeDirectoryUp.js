import { displayCurrentDirectory } from "../src/utils/displayCurrentDirectory.js";
import { dirname } from "path";
import { currentDir } from "../src/utils/displayCurrentDirectory.js";
import { changeCurrentDirectory } from "../src/utils/displayCurrentDirectory.js";
import { existsSync, statSync } from "fs";

export function changeDirectoryUp() {
  const parentDir = dirname(currentDir);

  if (!existsSync(parentDir)) {
    console.log(
      `Operation failed: parent directory "${parentDir}" does not exist.`
    );
    return;
  }

  if (!statSync(parentDir).isDirectory()) {
    console.log(
      `Operation failed: path "${parentDir}" exists but is not a directory.`
    );
    return;
  }

  changeCurrentDirectory(parentDir);
  displayCurrentDirectory();
}
