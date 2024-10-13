import { currentDir } from "../src/utils/displayCurrentDirectory.js";
import { join } from "path";
import { statSync, readdirSync } from "fs";

export function listDirectory() {
    const files = readdirSync(currentDir);
    const fileDetails = files.map((file) => {
      const filePath = join(currentDir, file);
      const type = statSync(filePath).isDirectory() ? "directory" : "file";
      return {
        Name: file,
        Type: type,
      };
    });
  
    const sortedFiles = fileDetails.sort((a, b) => {
      return a.Type === b.Type
        ? a.Name.localeCompare(b.Name)
        : a.Type === "directory"
        ? -1
        : 1;
    });
  
    console.table(sortedFiles);
  }