import { join, basename, isAbsolute } from "path";
import { existsSync, statSync } from "fs";
import { currentDir } from "./displayCurrentDirectory.js";

export function resolvePaths(sourcePath, destinationPath) {
  if (!sourcePath || !destinationPath) {
    return { error: "Operation failed: missing arguments." };
  }

  const fullSourcePath = isAbsolute(sourcePath)
    ? sourcePath
    : join(currentDir, sourcePath);
  let fullDestinationPath = isAbsolute(destinationPath)
    ? destinationPath
    : join(currentDir, destinationPath);

  if (!existsSync(fullSourcePath)) {
    return {
      error: `Operation failed: source file '${fullSourcePath}' does not exist.`,
    };
  }

  const sourceStats = statSync(fullSourcePath);
  const destinationExists = existsSync(fullDestinationPath);
  const destinationStats = destinationExists
    ? statSync(fullDestinationPath)
    : null;

  if (sourceStats.isDirectory()) {
    return { error: "Operation failed: source path is a directory." };
  }

  if (destinationStats && destinationStats.isDirectory()) {
    const fileName = basename(fullSourcePath);
    fullDestinationPath = join(fullDestinationPath, fileName);
  }

  if (fullSourcePath === fullDestinationPath) {
    return {
      error: "Operation failed: source and destination paths are the same.",
    };
  }

  return {
    fullSourcePath,
    fullDestinationPath,
    sourceExists: true,
    destinationExists,
    error: null,
  };
}
