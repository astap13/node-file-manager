import {join} from 'path'
import {writeFileSync} from 'fs'
import { currentDir } from './utils/displayCurrentDirectory.js';

export function createFile(fileName) {
    const fullPath = join(currentDir, fileName);
    writeFileSync(fullPath, '', { flag: 'wx' }, (err) => {
        if (err) console.log('Operation failed: cannot create file.');
    });
    console.log('File created successfully.');
}