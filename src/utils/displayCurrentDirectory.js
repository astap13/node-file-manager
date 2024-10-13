import { homedir } from "os";

export const homeDir = homedir();
export let currentDir = homeDir;

export function displayCurrentDirectory() {
    console.log(`You are currently in ${currentDir}`);
  }

  export function changeCurrentDirectory(newDir) {
    currentDir = newDir;
}