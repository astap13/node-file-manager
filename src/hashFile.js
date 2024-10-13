import { join, isAbsolute } from "path";
import { createReadStream, existsSync, statSync } from "fs";
import { createHash } from "crypto";
import { currentDir } from "./utils/displayCurrentDirectory.js";

export function hashFile(filePath) {
  if (!filePath || typeof filePath !== "string") {
    console.log(
      "Operation failed: file path is required and should be a string."
    );
    return;
  }

  const fullPath = isAbsolute(filePath) ? filePath : join(currentDir, filePath);

  if (existsSync(fullPath) && statSync(fullPath).isFile()) {
    try {
      const hash = createHash("sha256");
      const stream = createReadStream(fullPath);

      stream.on("data", (chunk) => hash.update(chunk));

      stream.on("end", () => {
        console.log(`Hash: ${hash.digest("hex")}`);
      });

      stream.on("error", (err) => {
        console.log(
          `Operation failed: cannot calculate hash. Error: ${err.message}`
        );
      });
    } catch (err) {
      console.log(`Operation failed: unexpected error. Error: ${err.message}`);
    }
  } else {
    console.log(
      "Operation failed: file does not exist or is not a valid file."
    );
  }
}
