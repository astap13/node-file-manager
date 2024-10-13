import { unlink } from "fs";
import { copyFile } from "./copyFile.js";
import { resolvePaths } from "./utils/resolvePath.js";

export function moveFile(sourcePath, destinationPath) {
  const { fullSourcePath, error } = resolvePaths(
    sourcePath,
    destinationPath
  );

  if (error) {
    console.log(error);
    return;
  }

  copyFile(sourcePath, destinationPath);

  unlink(fullSourcePath, (err) => {
    if (err) {
      console.log(
        "Operation failed: cannot delete original file. Error:",
        err.message
      );
    } else {
      console.log("File moved successfully.");
    }
  });
}
