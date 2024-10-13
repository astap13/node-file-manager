import { currentDir } from "../src/utils/displayCurrentDirectory.js";
import { join } from "path";
import { existsSync, statSync, createReadStream } from "fs";

export function readFile(filePath) {
  const fullPath = join(currentDir, filePath);
  if (existsSync(fullPath) && statSync(fullPath).isFile()) {
    const readStream = createReadStream(fullPath);
    readStream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });
    readStream.on("error", () =>
      console.log("Operation failed: cannot read file.")
    );
    readStream.on("end", () => console.log());
  } else {
    console.log("Operation failed: file does not exist.");
  }
}
