import { join, isAbsolute } from "path";
import { unlink, existsSync } from "fs";
import { currentDir } from "./utils/displayCurrentDirectory.js";

export function deleteFile(filePath) {
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

  unlink(fullPath, (err) => {
    if (err) {
      console.error(
        `Operation failed: cannot delete file. Error: ${err.message}`
      );
      return;
    }
    console.log("File deleted successfully.");
  });
}
