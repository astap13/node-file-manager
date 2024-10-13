import { join, isAbsolute } from "path";
import { renameSync, existsSync, statSync } from "fs";
import { currentDir } from "./utils/displayCurrentDirectory.js";

export function renameFile(oldFileName, newFileName) {
  if (
    !oldFileName ||
    !newFileName ||
    typeof oldFileName !== "string" ||
    typeof newFileName !== "string"
  ) {
    console.log(
      "Operation failed: both old and new file names are required and should be strings."
    );
    return;
  }

  const oldFullPath = isAbsolute(oldFileName)
    ? oldFileName
    : join(currentDir, oldFileName);
  const newFullPath = isAbsolute(newFileName)
    ? newFileName
    : join(currentDir, newFileName);

  if (!existsSync(oldFullPath)) {
    console.log(`Operation failed: file "${oldFullPath}" does not exist.`);
    return;
  }

  if (!statSync(oldFullPath).isFile()) {
    console.log(
      `Operation failed: path "${oldFullPath}" exists but is not a file.`
    );
    return;
  }

  if (existsSync(newFullPath)) {
    console.log(`Operation failed: file "${newFullPath}" already exists.`);
    return;
  }

  try {
    renameSync(oldFullPath, newFullPath);
    console.log("File renamed successfully.");
  } catch (err) {
    console.error(
      `Operation failed: cannot rename file. Error: ${err.message}`
    );
  }
}
