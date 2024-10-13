import { join, isAbsolute } from "path";
import { writeFileSync, existsSync, statSync } from "fs";
import { currentDir } from "./utils/displayCurrentDirectory.js";

export function createFile(fileName) {
  if (!fileName || typeof fileName !== "string") {
    console.log(
      "Operation failed: file name is required and should be a string."
    );
    return;
  }

  const fullPath = isAbsolute(fileName) ? fileName : join(currentDir, fileName);

  const directoryPath = isAbsolute(fileName) ? dirname(fullPath) : currentDir;
  if (!existsSync(directoryPath) || !statSync(directoryPath).isDirectory()) {
    console.log(
      `Operation failed: directory "${directoryPath}" does not exist or is not a directory.`
    );
    return;
  }

  try {
    writeFileSync(fullPath, "", { flag: "wx" });
    console.log("File created successfully.");
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(`Operation failed: file "${fileName}" already exists.`);
    } else {
      console.log(
        `Operation failed: cannot create file. Error: ${err.message}`
      );
    }
  }
}
