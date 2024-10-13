import { createReadStream, createWriteStream } from "fs";
import { resolvePaths } from "./utils/resolvePath.js";

export function copyFile(sourcePath, destinationPath) {
  const { fullSourcePath, fullDestinationPath, error } = resolvePaths(
    sourcePath,
    destinationPath
  );

  if (error) {
    console.log(error);
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
