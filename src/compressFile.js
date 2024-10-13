import { join, isAbsolute } from 'path';
import { createReadStream, createWriteStream, existsSync, statSync } from 'fs';
import { createBrotliCompress } from "zlib";
import { currentDir } from './utils/displayCurrentDirectory.js';

export function compressFile(inputPath, outputPath) {
  if (!inputPath || typeof inputPath !== "string") {
    console.log("Operation failed: input path is required and should be a string.");
    return;
  }
  
  if (!outputPath || typeof outputPath !== "string") {
    console.log("Operation failed: output path is required and should be a string.");
    return;
  }

  const fullInputPath = isAbsolute(inputPath) ? inputPath : join(currentDir, inputPath);
  const fullOutputPath = isAbsolute(outputPath) ? outputPath : join(currentDir, outputPath);

  if (!existsSync(fullInputPath) || !statSync(fullInputPath).isFile()) {
    console.log("Operation failed: input file does not exist or is not a valid file.");
    return;
  }

  const readStream = createReadStream(fullInputPath);
  const writeStream = createWriteStream(fullOutputPath);
  const brotli = createBrotliCompress();

  readStream.pipe(brotli).pipe(writeStream);

  writeStream.on("finish", () => console.log("File compressed successfully."));
  
  writeStream.on("error", (err) => {
    console.log(`Operation failed: cannot compress file. Error: ${err.message}`);
  });

  readStream.on("error", (err) => {
    console.log(`Operation failed: cannot read input file. Error: ${err.message}`);
  });
}