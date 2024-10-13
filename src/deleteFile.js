import { join } from "path";
import { unlink } from "fs";
import { currentDir } from "./utils/displayCurrentDirectory.js";

export function deleteFile(filePath) {
  const fullPath = join(currentDir, filePath);
  unlink(fullPath, (err) => {
    if (err) console.log("Operation failed: cannot delete file.");
  });
  console.log("File deleted successfully.");
}
