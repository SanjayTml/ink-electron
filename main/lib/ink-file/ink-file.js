import fs from "fs";
import {join as pathJoin} from "path";

export class InkFile {
    constructor(name, path) {
        this.name = name;
        this.path = path;
    }
    save() {
        let jsonObj = JSON.stringify(this, null, 2);
        let configPath = pathJoin(this.path, 'ink.json');
        fs.writeFileSync(configPath, jsonObj);
        console.log("New config initialised at:", configPath);
    }
}

export function initInkFile(name, path) {
    let inkFile = new InkFile(name, path);
    inkFile.save();
    return inkFile;
}

export function loadInkFile(path) {
    let configPath = pathJoin(path, 'ink.json');
    let config = JSON.parse(fs.readFileSync(configPath));
    let inkFile = new InkFile(config.name, config.path);
    return inkFile;
}
