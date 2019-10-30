import abletonParser from 'ableton-parser';
import { defaultInkFile } from './../ink-file/ink-file';
import { getByPath } from './../store/project-store';

export async function getParsedDiff(path) {
    let project = getByPath(path);
    let delta = {};
    if(project.type == "ableton-project") {
        let parser = await abletonParser.parseFile(path); 
        if (parser.getTracks() != defaultInkFile.tracks) {
            delta.tracks = parser.getTracks();
        }
        return delta;

    } else {
        throw new Error("Invalid Project Type");
    }
}
