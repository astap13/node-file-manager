import { join, basename, isAbsolute } from "path";
import { currentDir } from "./utils/displayCurrentDirectory.js";
import { createReadStream, createWriteStream, existsSync, statSync } from "fs";

export function copyFile(sourcePath, destinationPath) {
  if (!sourcePath || !destinationPath) {
    console.log("Operation failed: missing arguments.");
    return;
  }

  const fullSourcePath = isAbsolute(sourcePath) ? sourcePath : join(currentDir, sourcePath);
  let fullDestinationPath = isAbsolute(destinationPath) ? destinationPath : join(currentDir, destinationPath);

  if (!existsSync(fullSourcePath)) {
    console.log(`Operation failed: source file '${sourcePath}' does not exist.`);
    return;
  }

  const sourceStats = statSync(fullSourcePath);
  const destinationStats = existsSync(fullDestinationPath)
    ? statSync(fullDestinationPath)
    : null;

  if (sourceStats.isDirectory()) {
    console.log("Operation failed: source path is a directory.");
    return;
  }

  if (destinationStats && destinationStats.isDirectory()) {
    const fileName = basename(fullSourcePath);
    fullDestinationPath = join(fullDestinationPath, fileName);
  }

  if (fullSourcePath === fullDestinationPath) {
    console.log("Operation failed: source and destination paths are the same.");
    return;
  }

  const readStream = createReadStream(fullSourcePath);
  const writeStream = createWriteStream(fullDestinationPath);

  readStream.pipe(writeStream);

  readStream.on("error", (error) => {
    console.log(`Operation failed: cannot read file. Error: ${error.message}`);
  });

  writeStream.on("error", (error) => {
    console.log(`Operation failed: cannot write file. Error: ${error.message}`);
  });

  writeStream.on("finish", () => {
    console.log("File copied successfully.");
  });
}
