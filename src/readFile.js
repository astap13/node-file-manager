import { currentDir } from "../src/utils/displayCurrentDirectory.js";
import { join, isAbsolute } from "path";
import { existsSync, statSync, createReadStream } from "fs";

export function readFile(filePath) {
  if (!filePath || typeof filePath !== "string") {
    console.log(
      "Operation failed: file path is required and should be a string."
    );
    return;
  }

  const fullPath = isAbsolute(filePath) ? filePath : join(currentDir, filePath);

  if (!existsSync(fullPath)) {
    console.log(`Operation failed: file "${fullPath}" does not exist.`);
    return;
  }

  if (!statSync(fullPath).isFile()) {
    console.log(
      `Operation failed: path exists but "${fullPath}" is not a file.`
    );
    return;
  }

  const readStream = createReadStream(fullPath);
  readStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });
  readStream.on("error", (err) => {
    console.error(`Operation failed: cannot read file. Error: ${err.message}`);
  });
  readStream.on("end", () => console.log());
}
