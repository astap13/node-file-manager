import { join, isAbsolute } from "path";
import { existsSync, statSync } from "fs";
import { currentDir } from "./utils/displayCurrentDirectory.js";
import { changeCurrentDirectory } from "./utils/displayCurrentDirectory.js";

export function changeDirectory(newDir) {
  if (!newDir || typeof newDir !== "string") {
    console.log(
      "Operation failed: new directory path is required and should be a string."
    );
    return;
  }

  const newPath = isAbsolute(newDir) ? newDir : join(currentDir, newDir);

  if (!existsSync(newPath)) {
    console.log(`Operation failed: directory "${newPath}" does not exist.`);
    return;
  }

  if (!statSync(newPath).isDirectory()) {
    console.log(
      `Operation failed: path "${newPath}" exists but is not a directory.`
    );
    return;
  }

  changeCurrentDirectory(newPath);
}
