import { parseFile as abletonParseFile } from 'ableton-parser';
import { defaultInkFile } from './../ink-file/ink-file';
import { getByPath } from './../store/project-store';
import glob from "glob";

export async function getParsedDiff(path) {
    let project = getByPath(path);
    let delta = {};
    if(project.type == "ableton-project") {
        let projectFile = getProjectFile(project);
        if (projectFile.length < 1) {
            throw new Error("Unable to find project file");
        }
        console.log("Parsing Ableton Project", projectFile[0]);
        // TODO: What happens if there are multiple project files
        let parser = await abletonParseFile(projectFile[0]);
        console.log(parser.getTracks())
        if (parser.getTracks() != defaultInkFile.tracks) {
            delta.tracks = parser.getTracks();
        }
        return delta;

    } else {
        throw new Error("Invalid Project Type");
    }
}

function getProjectFile(project) {
    let option = {
        cwd: project.path,
        absolute: true
    };
    if(project.type == "ableton-project") {
        return glob.sync("*.als", option);
    } else {
        return [];
    }
}    