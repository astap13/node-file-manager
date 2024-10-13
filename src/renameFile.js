import { join } from "path";
import { renameSync, existsSync, statSync } from "fs";
import { currentDir } from "./utils/displayCurrentDirectory.js";

export function renameFile(oldFileName, newFileName) {
  const oldFullPath = join(currentDir, oldFileName);
  const newFullPath = join(currentDir, newFileName);
  if (existsSync(oldFullPath) && statSync(oldFullPath).isFile()) {
    renameSync(oldFullPath, newFullPath);
    console.log("File renamed successfully.");
  } else {
    console.log("Operation failed: file does not exist.");
  }
}
