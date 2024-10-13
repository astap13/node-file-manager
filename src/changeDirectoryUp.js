import { displayCurrentDirectory } from "../src/utils/displayCurrentDirectory.js";
import { dirname } from "path";
import { currentDir } from "../src/utils/displayCurrentDirectory.js";
import { changeCurrentDirectory } from "../src/utils/displayCurrentDirectory.js";

export function changeDirectoryUp() {
  const parentDir = dirname(currentDir);
  if (parentDir !== currentDir) {
    changeCurrentDirectory(parentDir);
  }
  displayCurrentDirectory();
}
